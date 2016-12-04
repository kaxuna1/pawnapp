package com.lombard.app.scheduledtasks;


import com.lombard.app.Repositorys.FilialRepository;
import com.lombard.app.Repositorys.Lombard.LoanRepo;
import com.lombard.app.StaticData;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.LoanInterest;
import com.lombard.app.models.Lombard.LoanPayment;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.lombard.app.StaticData.activeInterests;
import static com.lombard.app.StaticData.activeLoans;
import static com.lombard.app.StaticData.activePayments;

/**
 * Created by kakha on 12/29/2015.
 */
@Component
@Transactional
public class ScheduledTasks {
    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    @Scheduled(cron = "* * * * * *")
    public void calculatePercentsForLoans() {

        Calendar cal = Calendar.getInstance(); // locale-specific
        cal.setTime(new Date());
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        long time = cal.getTimeInMillis();
        //log.info(cal.getTime().toString());


        List<Loan> loanList=
                loanRepo.
                        findByIsActiveAndClosedAndNextInterestCalculationDateBetween(true,
                                false,
                                cal.getTime(),
                                new DateTime(cal.getTime().getTime()).plusDays(1).toDate());
        loanList.forEach(Loan::addInterest);
        loanRepo.save(loanList);
    }
    private boolean runOnce=true;



    @Transactional
    @Scheduled(cron = "* * * * * *")
    public void initData() {
        if(runOnce){
            runOnce=false;

            filialRepository.findAll().forEach(filial -> {
                loanRepo.findByFilialAndIsActiveOrderByCreateDate(filial,true).forEach(loan -> {
                    DateTime dateTime = new DateTime(loan.getCreateDate().getTime());
                    long filialId=filial.getId();
                    int year = dateTime.getYear();
                    int month = dateTime.getMonthOfYear();
                    int day = dateTime.getDayOfMonth();

                    if(!activeLoans.containsKey(filialId))
                        activeLoans.put(filialId,new HashMap<>());
                    if(!activeLoans.get(filialId).containsKey(year))
                        activeLoans.get(filialId).put(year,new HashMap<>());
                    if(!activeLoans.get(filialId).get(year).containsKey(month))
                        activeLoans.get(filialId).get(year).put(month,new HashMap<>());
                    if(!activeLoans.get(filialId).get(year).get(month).containsKey(day)){
                        List<Loan> list=new ArrayList<Loan>();
                        activeLoans.get(filialId).get(year).get(month).put(day,list);
                    }

                    loan.getUzrunvelyofas().size();
                    loan.getMovements().size();
                    loan.getPayments().forEach(loanPayment -> {
                        DateTime pdateTime = new DateTime(loanPayment.getCreateDate());
                        int pyear = dateTime.getYear();
                        int pmonth = dateTime.getMonthOfYear();
                        int pday = dateTime.getDayOfMonth();


                        if(!activePayments.containsKey(filialId))
                            activePayments.put(filialId,new HashMap<>());
                        if(!activePayments.get(filialId).containsKey(year))
                            activePayments.get(filialId).put(pyear,new HashMap<>());
                        if(!activePayments.get(filialId).get(pyear).containsKey(pmonth))
                            activePayments.get(filialId).get(pyear).put(pmonth,new HashMap<>());
                        if(!activePayments.get(filialId).get(pyear).get(pmonth).containsKey(pday)){
                            List<LoanPayment> list=new ArrayList<LoanPayment>();
                            activePayments.get(filialId).get(pyear).get(pmonth).put(pday,list);
                        }
                        activePayments.get(filialId).get(pyear).get(pmonth).get(pday).add(loanPayment);
                    });
                    loan.getLoanInterests().forEach(loanInterest -> {
                        DateTime idateTime = new DateTime(loanInterest.getCreateDate());
                        int iyear = dateTime.getYear();
                        int imonth = dateTime.getMonthOfYear();
                        int iday = dateTime.getDayOfMonth();
                        if(!activeInterests.containsKey(filialId))
                            activeInterests.put(filialId,new HashMap<>());
                        if(!activeInterests.get(filialId).containsKey(iyear))
                            activeInterests.get(filialId).put(iyear,new HashMap<>());
                        if(!activeInterests.get(filialId).get(iyear).containsKey(imonth))
                            activeInterests.get(filialId).get(iyear).put(imonth,new HashMap<>());
                        if(!activeInterests.get(filialId).get(iyear).get(imonth).containsKey(iday)){
                            List<LoanInterest> list=new ArrayList<LoanInterest>();
                            activeInterests.get(filialId).get(iyear).get(imonth).put(iday,list);
                        }
                        activeInterests.get(filialId).get(iyear).get(imonth).get(iday).add(loanInterest);
                    });

                    activeLoans.get(filialId).get(year).get(month).get(day).add(loan);
                });
            });
            log.info("initFinish");
        }
    }

    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private FilialRepository filialRepository;
}
