package com.lombard.app.models.Lombard.TypeEnums;

/**
 * Created by kaxa on 11/23/16.
 */
public enum LoanConditionPeryodType {
    DAY(1),
    WEEK(2),
    MONTH(3);


    private int CODE;

    LoanConditionPeryodType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
