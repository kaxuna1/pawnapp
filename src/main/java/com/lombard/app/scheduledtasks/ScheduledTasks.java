package com.lombard.app.scheduledtasks;


import com.lombard.app.Repositorys.FilialRepository;
import com.lombard.app.Repositorys.Lombard.ClientsRepo;
import com.lombard.app.Repositorys.Lombard.LoanRepo;
import com.lombard.app.StaticData;
import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.LoanInterest;
import com.lombard.app.models.Lombard.LoanPayment;
import com.lombard.app.models.Lombard.MovementModels.LoanMovement;
import com.lombard.app.models.Lombard.TypeEnums.LoanStatusTypes;
import com.lombard.app.models.Lombard.TypeEnums.MovementTypes;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;




import java.lang.management.MemoryUsage;
import java.util.*;
import java.util.function.Predicate;

import static com.lombard.app.StaticData.*;

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


        List<Loan> loanList =
                loanRepo.
                        findByIsActiveAndClosedAndNextInterestCalculationDateBetween(true,
                                false,
                                cal.getTime(),
                                new DateTime(cal.getTime().getTime()).plusDays(1).toDate());
        loanList.forEach(Loan::addInterest);
        loanRepo.save(loanList);
        loanList.forEach(StaticData::mapLoan);
    }

    private boolean runOnce = true;


    @Transactional
    @Scheduled(cron = "* * * * * *")
    public void initData() {
        if (runOnce) {
            StaticData.clientsRepo=this.clientsRepo;
            runOnce = false;
            filialRepository.findAll().stream().filter(Filial::isActive)
                    .forEach(filial -> loanRepo.findByFilialAndIsActiveOrderByCreateDate(filial, true)
                            .stream().forEach(StaticData::mapLoan));
            log.info("initFinish");
        }
    }

    @Transactional
    @Scheduled(cron = "* * * * * *")
    public void calculateOverDue() {
        Calendar cal = Calendar.getInstance(); // locale-specific
        cal.setTime(new Date());
        cal.setTimeZone(TimeZone.getTimeZone("Asia/Tbilisi"));
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        List<Loan> loen = loanRepo.findOverdue(cal.getTime());
        loen.forEach(loan -> {
            loan.setStatus(LoanStatusTypes.PAYMENT_LATE.getCODE());
            loan.getMovements().add(
                    new LoanMovement(
                            "დაიგვიანა პროცენტის გადახდა",
                            MovementTypes.PAYMENT_OVERDUE.getCODE(),
                            loan));
            loanRepo.save(loan);
        });

    }


    @Autowired
    private LoanRepo loanRepo;
    @Autowired
    private FilialRepository filialRepository;
    @Autowired
    private ClientsRepo clientsRepo;
}
