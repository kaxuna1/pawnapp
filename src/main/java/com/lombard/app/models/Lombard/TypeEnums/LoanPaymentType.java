package com.lombard.app.models.Lombard.TypeEnums;

/**
 * Created by kaxa on 11/23/16.
 */
public enum  LoanPaymentType {
    PARTIAL(1),
    FULL(2),
    PERCENT(3);

    private int CODE;

    LoanPaymentType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
