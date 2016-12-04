package com.lombard.app;

import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.LoanInterest;
import com.lombard.app.models.Lombard.LoanPayment;
import org.hashids.Hashids;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.List;

/**
 * Created by kaxa on 11/24/16.
 */
@Transactional
public class StaticData {
    public static HashMap<Long,SseEmitter> emitterHashMap=new HashMap<>();
    public static Hashids hashids = new Hashids("this is my salt", 5, "0123456789ABCDEF");
    public static HashMap<Long,HashMap<Long,HashMap<Long,Float>>> reportData=new HashMap<>();
    public static final Logger log = LoggerFactory.getLogger(StaticData.class);
    public static HashMap<Long,HashMap<Integer,HashMap<Integer,HashMap<Integer,List<Loan>>>>>
            activeLoans=new HashMap<Long,HashMap<Integer,HashMap<Integer,HashMap<Integer,List<Loan>>>>>();
    public static HashMap<Long,HashMap<Integer,HashMap<Integer,HashMap<Integer,List<LoanPayment>>>>>
            activePayments=new HashMap<Long,HashMap<Integer,HashMap<Integer,HashMap<Integer,List<LoanPayment>>>>>();
    public static HashMap<Long,HashMap<Integer,HashMap<Integer,HashMap<Integer,List<LoanInterest>>>>>
            activeInterests=new HashMap<Long,HashMap<Integer,HashMap<Integer,HashMap<Integer,List<LoanInterest>>>>>();
}
