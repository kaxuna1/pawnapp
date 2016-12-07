package com.lombard.app.models.Lombard.TypeEnums;

/**
 * Created by kaxa on 11/29/16.
 */
public enum LoanStatusTypes {
    ACTIVE(1),
    CLOSED_WITH_SUCCESS(2),
    CLOSED_WITH_CONFISCATION(3),
    PAYMENT_LATE(4);

    private int CODE;

    LoanStatusTypes(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
