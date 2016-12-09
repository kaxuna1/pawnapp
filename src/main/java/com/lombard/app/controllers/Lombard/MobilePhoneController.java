package com.lombard.app.controllers.Lombard;


import com.lombard.app.Repositorys.Lombard.*;
import com.lombard.app.Repositorys.SessionRepository;
import com.lombard.app.models.Enum.JsonReturnCodes;
import com.lombard.app.models.Enum.UserType;
import com.lombard.app.models.JsonMessage;
import com.lombard.app.models.Lombard.Dictionary.Brand;
import com.lombard.app.models.Lombard.Dictionary.Sinji;
import com.lombard.app.models.Lombard.ItemClasses.MobilePhone;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.TypeEnums.UzrunvelyofaStatusTypes;
import com.lombard.app.models.UserManagement.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by kaxa on 11/19/16.
 */
@Controller
public class MobilePhoneController {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private MobileModelRepo mobileModelRepo;
    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private MobilePhoneRepo mobilePhoneRepo;
    @Autowired
    private MobileBrandRepo mobileBrandRepo;
    @Autowired
    private BrandRepo brandRepo;
    @Autowired
    private UzrunvelyofaRepo uzrunvelyofaRepo;
    @Autowired
    private SinjiRepo sinjiRepo;
    @ResponseBody
    @RequestMapping("/createMobilePhone")
    public JsonMessage create(@CookieValue("projectSessionId") long sessionId,
                              @RequestParam(value = "imei", required = true, defaultValue = "") String imei,
                              @RequestParam(value = "brand", required = true, defaultValue = "") long brand,
                              @RequestParam(value = "comment", required = true, defaultValue = "") String comment,
                              @RequestParam(value = "model", required = true, defaultValue = "") String model,
                              @RequestParam(value = "loan", required = true, defaultValue = "") long loan,
                              @RequestParam(value = "sum", required = true, defaultValue = "0") float sum){
        Session session=sessionRepository.findOne(sessionId);
        if(session.isIsactive()&&
                (session.getUser().getType()== UserType.lombardOperator.getCODE()
                        ||session.getUser().getType()== UserType.lombardManager.getCODE())){
            try {
                MobilePhone mobilePhone=new MobilePhone(imei,mobileBrandRepo.findOne(brand),loanRepo.findOne(loan),comment,model,sum);
                mobilePhoneRepo.save(mobilePhone);
            }catch (Exception e){
                e.printStackTrace();
                return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), e.toString());
            }
            return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "კლიენტი შეიქმნა წარმატებით");




        }else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION.getCODE(),"არ გაქვთ ამ მოქმედების შესრულების უფლება");
        }

    }
    @RequestMapping("/getLoanPhones")
    @ResponseBody
    public List<Uzrunvelyofa> getLoanPhones(@CookieValue("projectSessionId") long sessionId,
                                            @RequestParam(value = "loan", required = true, defaultValue = "0") long loan){
        Session session = sessionRepository.findOne(sessionId);
        Loan loanObj = loanRepo.findOne(loan);
        return loanObj.getUzrunvelyofas();
    }
    @RequestMapping("/getbrands/{type}")
    @ResponseBody
    public List<Brand> getBrands(@CookieValue("projectSessionId") long sessionId,
                                 @PathVariable("type")int type){
        int type2=0;
        if(type==1||type==2)
            type2=3;

        return brandRepo.findByTypeOrType(type,type2);
    }
    @RequestMapping("/getSinjebi")
    @ResponseBody
    public List<Sinji> getSinjebi(){
        return sinjiRepo.findAll();
    }
    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 30);
        return pageSpecification;
    }
    @RequestMapping("/getdakavebulinivtebi")
    @ResponseBody
    public Page<Uzrunvelyofa> getConfiscated(@CookieValue("projectSessionId") long sessionId,
                                             @RequestParam(value = "index", required = true, defaultValue = "0") int index,
                                             @RequestParam(value = "search", required = true, defaultValue = "") String search,
                                             @RequestParam(value = "datvirtuli", required = true, defaultValue = "false") boolean datvirtuli,
                                             @RequestParam(value = "dakavebuli", required = true, defaultValue = "false") boolean dakavebuli,
                                             @RequestParam(value = "gasayidi", required = true, defaultValue = "false") boolean gasayidi,
                                             @RequestParam(value = "gayiduli", required = true, defaultValue = "false") boolean gayiduli){
        List<Integer> statuses= new ArrayList<>();

        if(datvirtuli)
            statuses.add(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
        if(dakavebuli)
            statuses.add(UzrunvelyofaStatusTypes.DAKAVEBULI.getCODE());
        if(gasayidi)
            statuses.add(UzrunvelyofaStatusTypes.GASAYIDAD_GADAGZAVNILI.getCODE());
        if(gayiduli)
            statuses.add(UzrunvelyofaStatusTypes.GAYIDULI.getCODE());



        if(!datvirtuli&&!dakavebuli&&!gasayidi&&!gayiduli){
            statuses.add(UzrunvelyofaStatusTypes.GAYIDULI.getCODE());
            statuses.add(UzrunvelyofaStatusTypes.GASAYIDAD_GADAGZAVNILI.getCODE());
            statuses.add(UzrunvelyofaStatusTypes.DAKAVEBULI.getCODE());
            statuses.add(UzrunvelyofaStatusTypes.DATVIRTULI.getCODE());
        }


        return uzrunvelyofaRepo.findForFilial(search,
                UzrunvelyofaStatusTypes.DAKAVEBULI.getCODE(),
                sessionRepository.findOne(sessionId).getUser().getFilial(),statuses,constructPageSpecification(index));
    }


}
