package com.lombard.app.controllers.Lombard;


import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.zxing.MultiFormatWriter;
import com.lombard.app.Repositorys.Lombard.*;
import com.lombard.app.Repositorys.SessionRepository;
import com.lombard.app.Services.Service1;
import com.lombard.app.StaticData;
import com.lombard.app.models.Enum.JsonReturnCodes;
import com.lombard.app.models.Enum.UserType;
import com.lombard.app.models.Filial;
import com.lombard.app.models.JsonMessage;
import com.lombard.app.models.Lombard.Client;
import com.lombard.app.models.Lombard.Dictionary.Sinji;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.LoanInterest;
import com.lombard.app.models.Lombard.MovementModels.LoanMovement;
import com.lombard.app.models.Lombard.TypeEnums.LoanStatusTypes;
import com.lombard.app.models.Lombard.TypeEnums.MovementTypes;
import com.lombard.app.models.Lombard.TypeEnums.UzrunvelyofaStatusTypes;
import com.lombard.app.models.Lombard.TypeEnums.UzrunvelyofaTypes;
import com.lombard.app.models.UserManagement.Session;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

/**
 * Created by kaxa on 11/19/16.
 */
@Controller
public class LoanController {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private MobileBrandRepo mobileBrandRepo;
    @Autowired
    private MobilePhoneRepo mobilePhoneRepo;
    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private ClientsRepo clientsRepo;
    @Autowired
    private LoanMovementsRepo loanMovementsRepo;
    @Autowired
    private LoanConditionsRepo loanConditionsRepo;
    @Autowired
    private LoanInterestRepo loanInterestRepo;
    @Autowired
    private Service1 service1;
    @Autowired
    private LaptopBrandRepo laptopBrandRepo;
    @Autowired
    private LaptopRepo laptopRepo;
    @Autowired
    private BrandRepo brandRepo;
    @Autowired
    private UzrunvelyofaRepo uzrunvelyofaRepo;
    @Autowired
    private SinjiRepo sinjiRepo;

    @RequestMapping("/send")
    @ResponseBody
    public String sendMessage(String s) {

        StaticData.emitterHashMap.forEach(new BiConsumer<Long, SseEmitter>() {
            @Override
            public void accept(Long s, SseEmitter sseEmitter) {
                try {
                    sseEmitter.send(s + " session:" + s);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        return s;
    }

    private static final Logger log = LoggerFactory.getLogger(LoanController.class);


    @RequestMapping(method = RequestMethod.GET, value = "/sse")
    public SseEmitter getSseEmitter(@CookieValue("projectSessionId") long sessionId) {
        SseEmitter emitter;
        if (StaticData.emitterHashMap.get(sessionId) == null) {
            emitter = new SseEmitter();
        } else {
            emitter = StaticData.emitterHashMap.get(sessionId);
        }

        try {
            emitter.send("kaxa");
            emitter.complete();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return emitter;
    }


    @RequestMapping("loanbarcode/{id}")
    @ResponseBody
    public byte[] getLoanBarcode(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        Loan loan = loanRepo.findOne(id);
        MultiFormatWriter writer = new MultiFormatWriter();
        String data = loan.getNumber();
/*
        try {
            BitMatrix bm=writer.encode(data, BarcodeFormat.CODE_128,180,40);
        } catch (WriterException e) {
            e.printStackTrace();
            return null;
        }*/
        return null;

    }

    @RequestMapping("/getloan/{id}")
    @ResponseBody
    public Loan getLoan(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        return loanRepo.findOne(id);
    }

    @RequestMapping("/getloans")
    @ResponseBody
    public Page<Loan> getLoans(@CookieValue("projectSessionId") long sessionId,
                               @RequestParam(value = "index", required = true, defaultValue = "0") int index,
                               @RequestParam(value = "search", required = true, defaultValue = "") String search,
                               @RequestParam(value = "closed", required = true, defaultValue = "false") boolean closed,
                               @RequestParam(value = "opened", required = true, defaultValue = "false") boolean opened,
                               @RequestParam(value = "late", required = true, defaultValue = "false") boolean late,
                               @RequestParam(value = "start", required = true, defaultValue = "false") long start,
                               @RequestParam(value = "end", required = true, defaultValue = "false") long end) {



        Session session = sessionRepository.findOne(sessionId);
        List<Integer> statuses = new ArrayList<>();
        if (!closed && !opened) {
            if(!late){
                statuses.add(LoanStatusTypes.ACTIVE.getCODE());
                statuses.add(LoanStatusTypes.CLOSED_WITH_SUCCESS.getCODE());
            }else{
                statuses.add(LoanStatusTypes.PAYMENT_LATE.getCODE());
                statuses.add(LoanStatusTypes.CLOSED_WITH_CONFISCATION.getCODE());
            }
        }
        if (opened) {
            if (!late)
                statuses.add(LoanStatusTypes.ACTIVE.getCODE());
            else
                statuses.add(LoanStatusTypes.PAYMENT_LATE.getCODE());
        }
        if (closed) {
            if (!late)
                statuses.add(LoanStatusTypes.CLOSED_WITH_SUCCESS.getCODE());
            else
                statuses.add(LoanStatusTypes.CLOSED_WITH_CONFISCATION.getCODE());
        }
        /*if(late&&opened&&!closed){
            statuses.add(LoanStatusTypes.PAYMENT_LATE.getCODE());

        }
        if(late&&closed&&!opened){
            statuses.add(LoanStatusTypes.CLOSED_WITH_CONFISCATION.getCODE());
        }

        if(late&&!opened&&!closed){
            statuses.add(LoanStatusTypes.CLOSED_WITH_CONFISCATION.getCODE());
            statuses.add(LoanStatusTypes.PAYMENT_LATE.getCODE());
        }*/
        if (!search.isEmpty())
            return loanRepo.findMyFilialLoansWithSearch(search, session.getUser().getFilial(), statuses,new Date(start),new DateTime(new Date(end)).plusDays(1).toDate(), constructPageSpecification(index));
        else
            return loanRepo.findMyFilialLoans(session.getUser().getFilial(), statuses,new Date(start),new DateTime(new Date(end)).plusDays(1).toDate(), constructPageSpecification(index));
    }

    @RequestMapping("/getClientloans/{id}")
    @ResponseBody
    public HashMap<Long,Loan> getClientLoans(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        return StaticData.clientsToLoansMap.get(id);
    }

    @RequestMapping("/createloan")
    @ResponseBody
    @Transactional
    public JsonMessage createLoan(@CookieValue("projectSessionId") long sessionId,
                                  @RequestParam(value = "json") String jsonString) {


        Session session = sessionRepository.findOne(sessionId);

        if (session.isIsactive() & session.getUser().getType() == UserType.lombardOperator.getCODE()) {

            try {
                List<Uzrunvelyofa> uzrunvelyofas = new ArrayList<>();
                float loanSum = 0;


                JsonParser jsonParser = new JsonParser();
                Gson gson = new Gson();


                JsonObject mainObject = jsonParser.parse(jsonString).getAsJsonObject();
                JsonObject clientObject = mainObject.getAsJsonObject("client");

                JsonArray mobiles = mainObject.getAsJsonArray("mobiles");
                JsonArray laptopsJson = mainObject.getAsJsonArray("laptops");
                JsonArray goldJson = mainObject.getAsJsonArray("gold");
                JsonArray homeTechJson = mainObject.getAsJsonArray("homeTech");
                JsonArray otherJson = mainObject.getAsJsonArray("other");

                long conditionId = mainObject.get("condition").getAsLong();
                long clientId = clientObject.get("id").getAsLong();


                for (int i = 0; i < mobiles.size(); i++) {
                    JsonObject mobile = mobiles.get(i).getAsJsonObject();
                    Uzrunvelyofa mobilePhoneTemp = new Uzrunvelyofa();
                    mobilePhoneTemp.setUzrunvelyofaMovements(new ArrayList<>());
                    mobilePhoneTemp.setSum(mobile.get("sum").getAsFloat());
                    mobilePhoneTemp.setActive(true);
                    mobilePhoneTemp.setComment(mobile.get("comment").getAsString());
                    mobilePhoneTemp.setIMEI(mobile.get("imei").getAsString());
                    mobilePhoneTemp.setLoan(null);
                    mobilePhoneTemp.setType(UzrunvelyofaTypes.MOBILE.getCODE());
                    mobilePhoneTemp.setModel(mobile.get("model").getAsString());
                    mobilePhoneTemp.setBrand(brandRepo.findOne(mobile.get("brand").getAsLong()));
                    mobilePhoneTemp.setStatus(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
                    uzrunvelyofas.add(mobilePhoneTemp);
                    loanSum += mobile.get("sum").getAsFloat();
                }
                for (int i = 0; i < laptopsJson.size(); i++) {
                    JsonObject laptop = laptopsJson.get(i).getAsJsonObject();
                    Uzrunvelyofa laptopTemp = new Uzrunvelyofa();
                    laptopTemp.setUzrunvelyofaMovements(new ArrayList<>());
                    laptopTemp.setActive(true);
                    laptopTemp.setBrand(brandRepo.findOne(laptop.get("brand").getAsLong()));
                    laptopTemp.setModel(laptop.get("model").getAsString());
                    laptopTemp.setCpu(laptop.get("cpu").getAsString());
                    laptopTemp.setGpu(laptop.get("gpu").getAsString());
                    laptopTemp.setRam(laptop.get("ram").getAsString());
                    laptopTemp.setHdd(laptop.get("hdd").getAsString());
                    laptopTemp.setType(UzrunvelyofaTypes.LAPTOP.getCODE());
                    laptopTemp.setStatus(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
                    laptopTemp.setSum(laptop.get("sum").getAsFloat());
                    laptopTemp.setComment(laptop.get("comment").getAsString());
                    loanSum += laptop.get("sum").getAsFloat();
                    uzrunvelyofas.add(laptopTemp);
                }
                for (int i = 0; i < goldJson.size(); i++) {
                    JsonObject gold = goldJson.get(i).getAsJsonObject();
                    Uzrunvelyofa goldTemp = new Uzrunvelyofa();
                    goldTemp.setUzrunvelyofaMovements(new ArrayList<>());
                    goldTemp.setActive(true);
                    goldTemp.setType(UzrunvelyofaTypes.GOLD.getCODE());
                    goldTemp.setStatus(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
                    goldTemp.setName(gold.get("name").getAsString());
                    goldTemp.setSinji(sinjiRepo.findOne(gold.get("sinji").getAsLong()));
                    goldTemp.setMass(gold.get("mass").getAsFloat());
                    goldTemp.setSum(gold.get("sum").getAsFloat());
                    goldTemp.setComment(gold.get("comment").getAsString());
                    loanSum += gold.get("sum").getAsFloat();
                    uzrunvelyofas.add(goldTemp);
                }
                for (int i = 0; i < otherJson.size(); i++) {
                    JsonObject other = otherJson.get(i).getAsJsonObject();
                    Uzrunvelyofa otherTemp = new Uzrunvelyofa();
                    otherTemp.setUzrunvelyofaMovements(new ArrayList<>());
                    otherTemp.setActive(true);
                    otherTemp.setBrand(brandRepo.findOne(other.get("brand").getAsLong()));
                    otherTemp.setModel(other.get("model").getAsString());
                    otherTemp.setType(UzrunvelyofaTypes.OTHER.getCODE());
                    otherTemp.setStatus(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
                    otherTemp.setSum(other.get("sum").getAsFloat());
                    otherTemp.setComment(other.get("comment").getAsString());
                    loanSum += other.get("sum").getAsFloat();
                    uzrunvelyofas.add(otherTemp);
                }
                for (int i = 0; i < homeTechJson.size(); i++) {
                    JsonObject other = homeTechJson.get(i).getAsJsonObject();
                    Uzrunvelyofa homeTechTemp = new Uzrunvelyofa();
                    homeTechTemp.setUzrunvelyofaMovements(new ArrayList<>());
                    homeTechTemp.setActive(true);
                    homeTechTemp.setBrand(brandRepo.findOne(other.get("brand").getAsLong()));
                    homeTechTemp.setModel(other.get("model").getAsString());
                    homeTechTemp.setType(UzrunvelyofaTypes.HOMETECH.getCODE());
                    homeTechTemp.setStatus(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
                    homeTechTemp.setSum(other.get("sum").getAsFloat());
                    homeTechTemp.setComment(other.get("comment").getAsString());
                    loanSum += other.get("sum").getAsFloat();
                    uzrunvelyofas.add(homeTechTemp);
                }


                Loan loan = new Loan(clientsRepo.findOne(clientId),
                        session.getUser().getFilial(), loanSum, session.getUser());
                loan.setLoanCondition(loanConditionsRepo.findOne(conditionId));
                loan.setStatus(LoanStatusTypes.ACTIVE.getCODE());
                loan = loanRepo.save(loan);
                long id = loan.getId();
                int year = new DateTime().getYear() - 2000;
                loan.setNumber("LN" + StaticData.hashids.encode(id) + year);
                final Loan finalLoan = loan;
                uzrunvelyofas.forEach(uzrunvelyofa -> uzrunvelyofa.setLoan(finalLoan));
                uzrunvelyofas = uzrunvelyofaRepo.save(uzrunvelyofas);
                uzrunvelyofas.forEach(uzrunvelyofa -> uzrunvelyofa.setNumber("LP" + StaticData.hashids.encode(uzrunvelyofa.getId() + year)));
                uzrunvelyofas = uzrunvelyofaRepo.save(uzrunvelyofas);
                LoanMovement loanMovement = new LoanMovement("სესხი დარეგისტრირდა", MovementTypes.REGISTERED.getCODE(), loan);
                loanMovementsRepo.save(loanMovement);
                loan.addFirstInterest();
                loanRepo.save(loan);
                StaticData.mapLoan(loan);
                return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "ok");
            } catch (Exception e) {
                e.printStackTrace();
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), e.getMessage());
            }

        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "permission problem");
        }
    }

    @RequestMapping("/p")
    @ResponseBody
    public boolean populate(@CookieValue("projectSessionId") long sessionId) {
        Session session = sessionRepository.findOne(sessionId);
        Filial filial = session.getUser().getFilial();
        List<Client> clients = filial.getClients();
        clients.forEach(new Consumer<Client>() {
            @Override
            public void accept(Client client) {
                ExecutorService executorService = Executors.newSingleThreadExecutor();
                executorService.submit(() -> {
                    for (int i = 0; i < 10000; i++) {


                        int sum = ThreadLocalRandom.current().nextInt(500, 1000 + 1);

                        List<Uzrunvelyofa> uzrunvelyofas = new ArrayList<>();
                        Uzrunvelyofa mobilePhoneTemp = new Uzrunvelyofa();
                        mobilePhoneTemp.setUzrunvelyofaMovements(new ArrayList<>());
                        mobilePhoneTemp.setSum(sum);
                        mobilePhoneTemp.setActive(true);
                        mobilePhoneTemp.setComment("komentari");
                        mobilePhoneTemp.setIMEI("1251234123");
                        mobilePhoneTemp.setLoan(null);
                        mobilePhoneTemp.setType(UzrunvelyofaTypes.MOBILE.getCODE());
                        mobilePhoneTemp.setModel("iphone 6s");
                        mobilePhoneTemp.setBrand(brandRepo.findOne(1L));
                        mobilePhoneTemp.setStatus(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
                        uzrunvelyofas.add(mobilePhoneTemp);

                        Loan loan = new Loan(clientsRepo.findOne(client.getId()),
                                session.getUser().getFilial(), sum, session.getUser());
                        loan.setLoanCondition(loanConditionsRepo.findOne(1L));
                        loan = loanRepo.save(loan);
                        long id = loan.getId();
                        int year = new DateTime().getYear() - 2000;
                        loan.setNumber("LN" + StaticData.hashids.encode(id) + year);
                        final Loan finalLoan = loan;
                        uzrunvelyofas.forEach(uzrunvelyofa -> uzrunvelyofa.setLoan(finalLoan));
                        uzrunvelyofas = uzrunvelyofaRepo.save(uzrunvelyofas);
                        uzrunvelyofas.forEach(uzrunvelyofa -> uzrunvelyofa.setNumber("LP" + StaticData.hashids.encode(uzrunvelyofa.getId() + year)));
                        uzrunvelyofas = uzrunvelyofaRepo.save(uzrunvelyofas);
                        LoanMovement loanMovement = new LoanMovement("სესხი დარეგისტრირდა", MovementTypes.REGISTERED.getCODE(), loan);
                        loanMovementsRepo.save(loanMovement);
                        loan.addFirstInterest();
                        loanRepo.save(loan);
                        synchronized (this) {

                        }

                        log.info("submited " + client.getId() + "" + i);
                    }
                });
            }
        });
        return true;
    }

    @RequestMapping("/getsumforloanclosing/{id}")
    @ResponseBody
    public JsonMessage getSumForLoanClosing(@CookieValue("projectSessionId") long sessionId,
                                            @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        Loan loan = loanRepo.findOne(id);
        if (session.getUser().getFilial().getId() == loan.getFilial().getId()) {
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), loan.getSumForLoanClose() + "");
        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(), "DONTHAVEPERMISSION");
        }
    }

    @RequestMapping("/getloansmovements/{id}")
    @ResponseBody
    public List<LoanMovement> getLoansMovements(@CookieValue("projectSessionId") long sessionId,
                                                @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        Loan loan = loanRepo.findOne(id);
        return loanMovementsRepo.findByLoan(loan);
    }

    @RequestMapping("/getloaninterests/{id}")
    @ResponseBody
    public List<LoanInterest> getLoanInterests(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        Loan loan = loanRepo.findOne(id);
        return loan.getLoanInterests();
    }

    @RequestMapping("/closewithconfiscation/{id}")
    @ResponseBody
    public JsonMessage closeLoanWithConfiscation(@CookieValue("projectSessionId") long sessionId,
                                                 @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        Loan loan = loanRepo.findOne(id);
        if (session.isIsactive() &&
                loan.getFilial().getId() == session.getUser().getFilial().getId() &&
                loan.isOverdue()) {
            try {
                loan.confiscateAndCloseLoan();
                loanRepo.save(loan);

                return new JsonMessage(JsonReturnCodes.Ok.getCODE(),
                        "წარმატებით შესრულდა ოპერაცია");
            } catch (Exception e) {
                e.printStackTrace();
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(),
                        "მოხდა შეცდომა ოპერაციის შესრულებისას");
            }


        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),
                    "არგაქვთ ამ მოქმედების უფლება");
        }

    }

    @RequestMapping("/rt")
    @ResponseBody
    public HashMap<Integer, HashMap<Long,Loan>> getrt(@CookieValue("projectSessionId") long sessionId, int m) {
        return StaticData.activeLoans.get(sessionRepository.findOne(sessionId).getUser().getFilial().getId()).get(2016).get(3);
    }


    private Pageable constructPageSpecification(int pageIndex) {
        return new PageRequest(pageIndex, 30);
    }

}
