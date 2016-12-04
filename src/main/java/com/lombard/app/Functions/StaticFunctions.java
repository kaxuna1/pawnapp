package com.lombard.app.Functions;

import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.LoanInterest;
import com.lombard.app.models.Lombard.LoanPayment;
import kotlin.jvm.Synchronized;

/**
 * Created by kaxa on 11/18/16.
 */
public class StaticFunctions {
    public static boolean checkValueNotEmpty(String... params){
        for(String param:params){
            if (param.isEmpty()){
                return false;
            }
        }

        return true;
    }
    public static String getStr(String string){
        return string;
    }

    public synchronized static boolean addLoanToStatic(Loan loan){
        //TODO სტატიკურ ინფო-ში ახალი შექმნილის დამატება...
        return true;
    }
    public synchronized static boolean addInterestToStatic(LoanInterest interest){
        //TODO სტატიკურ ინფო-ში ახალი შექმნილის დამატება...
        return true;
    }

    public synchronized static boolean addPaymentToStatic(LoanPayment payment){
        //TODO სტატიკურ ინფო-ში ახალი შექმნილის დამატება...
        return true;
    }
}
