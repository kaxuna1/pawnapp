package com.lombard.app;

import com.lombard.app.Repositorys.Lombard.ClientsRepo;
import com.lombard.app.Repositorys.Lombard.LoanInterestRepo;
import com.lombard.app.Repositorys.Lombard.LoanPaymentRepo;
import com.lombard.app.Repositorys.Lombard.LoanRepo;
import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.ItemClasses.UzrunvelyofaInterest;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.LoanInterest;
import com.lombard.app.models.Lombard.LoanPayment;
import org.hashids.Hashids;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by kaxa on 11/24/16.
 */
@Transactional
public class StaticData {
    public static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/mm/yyyy");
    public static HashMap<Long, SseEmitter> emitterHashMap = new HashMap<>();
    public static Hashids hashids = new Hashids("this is my salt", 5, "0123456789ABCDEF");
    public static HashMap<Long, HashMap<Long, HashMap<Long, Float>>> reportData = new HashMap<>();
    public static final Logger log = LoggerFactory.getLogger(StaticData.class);
    public static HashMap<Long, HashMap<Integer, HashMap<Integer, HashMap<Integer, HashMap<Long, Loan>>>>>
            activeLoans = new HashMap<Long, HashMap<Integer, HashMap<Integer, HashMap<Integer, HashMap<Long, Loan>>>>>();
    public static HashMap<Long, HashMap<Integer, HashMap<Integer, HashMap<Integer, HashMap<Long, LoanPayment>>>>>
            activePayments = new HashMap<Long, HashMap<Integer, HashMap<Integer, HashMap<Integer, HashMap<Long, LoanPayment>>>>>();
    public static HashMap<Long, HashMap<Integer, HashMap<Integer, HashMap<Integer, HashMap<Long, UzrunvelyofaInterest>>>>>
            activeInterests = new HashMap<Long, HashMap<Integer, HashMap<Integer, HashMap<Integer, HashMap<Long, UzrunvelyofaInterest>>>>>();
    public static HashMap<Long, HashMap<Long, Loan>> clientsToLoansMap = new HashMap<Long, HashMap<Long, Loan>>();
    public static ClientsRepo clientsRepo;
    public static LoanRepo loanRepo;
    public static LoanPaymentRepo loanPaymentRepo;
    public static LoanInterestRepo loanInterestRepo;
    public synchronized static void mapLoan(Loan loan) {
        DateTime dateTime = new DateTime(loan.getCreateDate().getTime());
        long filialId = loan.getFilial().getId();
        int year = dateTime.getYear();
        int month = dateTime.getMonthOfYear();
        int day = dateTime.getDayOfMonth();

        if (!activeLoans.containsKey(filialId))
            activeLoans.put(filialId, new HashMap<>());
        if (!activeLoans.get(filialId).containsKey(year))
            activeLoans.get(filialId).put(year, new HashMap<>());
        if (!activeLoans.get(filialId).get(year).containsKey(month))
            activeLoans.get(filialId).get(year).put(month, new HashMap<>());
        if (!activeLoans.get(filialId).get(year).get(month).containsKey(day)) {
            HashMap<Long, Loan> list = new HashMap<>();
            activeLoans.get(filialId).get(year).get(month).put(day, list);
        }

        loan.getUzrunvelyofas().size();
        loan.getMovements().size();
        loan.getPayments().forEach(loanPayment -> {
            DateTime pdateTime = new DateTime(loanPayment.getCreateDate());
            int pyear = dateTime.getYear();
            int pmonth = dateTime.getMonthOfYear();
            int pday = dateTime.getDayOfMonth();
            if (!activePayments.containsKey(filialId))
                activePayments.put(filialId, new HashMap<>());
            if (!activePayments.get(filialId).containsKey(year))
                activePayments.get(filialId).put(pyear, new HashMap<>());
            if (!activePayments.get(filialId).get(pyear).containsKey(pmonth))
                activePayments.get(filialId).get(pyear).put(pmonth, new HashMap<>());
            if (!activePayments.get(filialId).get(pyear).get(pmonth).containsKey(pday)) {
                HashMap<Long, LoanPayment> list = new HashMap<Long, LoanPayment>();
                activePayments.get(filialId).get(pyear).get(pmonth).put(pday, list);
            }
            if (activePayments.get(filialId).get(pyear).get(pmonth).get(pday).containsKey(loanPayment.getId())) {
                activePayments.get(filialId).get(pyear).get(pmonth).get(pday).replace(loanPayment.getId(), loanPayment);
            } else {
                activePayments.get(filialId).get(pyear).get(pmonth).get(pday).put(loanPayment.getId(), loanPayment);
            }
        });
        loan.getLoanInterests().forEach(loanInterest -> {
            DateTime idateTime = new DateTime(loanInterest.getCreateDate());
            int iyear = dateTime.getYear();
            int imonth = dateTime.getMonthOfYear();
            int iday = dateTime.getDayOfMonth();
            if (!activeInterests.containsKey(filialId))
                activeInterests.put(filialId, new HashMap<>());
            if (!activeInterests.get(filialId).containsKey(iyear))
                activeInterests.get(filialId).put(iyear, new HashMap<>());
            if (!activeInterests.get(filialId).get(iyear).containsKey(imonth))
                activeInterests.get(filialId).get(iyear).put(imonth, new HashMap<>());
            if (!activeInterests.get(filialId).get(iyear).get(imonth).containsKey(iday)) {
                HashMap<Long, UzrunvelyofaInterest> list = new HashMap<Long, UzrunvelyofaInterest>();
                activeInterests.get(filialId).get(iyear).get(imonth).put(iday, list);
            }
            if (activeInterests.get(filialId).get(iyear).get(imonth).get(iday).containsKey(loanInterest.getId())) {
                activeInterests.get(filialId).get(iyear).get(imonth).get(iday).replace(loanInterest.getId(), loanInterest);
            } else {
                activeInterests.get(filialId).get(iyear).get(imonth).get(iday).put(loanInterest.getId(), loanInterest);
            }
        });
        if (clientsToLoansMap.containsKey(loan.getClientId())) {
            clientsToLoansMap.get(loan.getClientId()).put(loan.getId(), loan);
        } else {
            clientsToLoansMap.put(loan.getClientId(), new HashMap<Long, Loan>());
            clientsToLoansMap.get(loan.getClientId()).put(loan.getId(), loan);
        }
        if (activeLoans.get(filialId).get(year).get(month).get(day).containsKey(loan.getId())) {
            activeLoans.get(filialId).get(year).get(month).get(day).replace(loan.getId(), loan);
        } else {
            activeLoans.get(filialId).get(year).get(month).get(day).put(loan.getId(), loan);
        }
    }
    public static List<Loan> getLoansByMonthFromHash(Date date, Filial filial) {
        List<Loan> loans = new ArrayList<>();
        DateTime dateTime = new DateTime(date.getTime());
        int thisMonth = dateTime.getMonthOfYear();
        dateTime = dateTime.withDayOfMonth(1);
        while (dateTime.getMonthOfYear() == thisMonth) {
            loans.addAll(getloansByDayFromHash(dateTime.toDate(), filial));
            dateTime = dateTime.plusDays(1);
        }

        return loans;
    }
    public static List<Loan> getloansByDayFromHash(Date date, Filial filial) {
        List<Loan> loans = new ArrayList<>();
        DateTime dateTime = new DateTime(date);
        long filialId = filial.getId();
        int year = dateTime.getYear();
        int month = dateTime.getMonthOfYear();
        int day = dateTime.getDayOfMonth();

        if (!activeLoans.containsKey(filialId))
            activeLoans.put(filialId, new HashMap<>());
        if (!activeLoans.get(filialId).containsKey(year))
            activeLoans.get(filialId).put(year, new HashMap<>());
        if (!activeLoans.get(filialId).get(year).containsKey(month))
            activeLoans.get(filialId).get(year).put(month, new HashMap<>());
        if (!activeLoans.get(filialId).get(year).get(month).containsKey(day)) {
            HashMap<Long, Loan> list = new HashMap<>();
            activeLoans.get(filialId).get(year).get(month).put(day, list);
        }
        return activeLoans.get(filialId).get(year).get(month).get(day).values().stream().collect(Collectors.toList());

    }
}
