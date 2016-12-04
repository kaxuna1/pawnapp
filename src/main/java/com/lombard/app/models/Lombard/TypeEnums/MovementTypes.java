package com.lombard.app.models.Lombard.TypeEnums;

/**
 * Created by kaxa on 11/23/16.
 */
public enum MovementTypes {
    REGISTERED(1),
    LOAN_PAYMENT_MADE_PARTIAL(2),
    LOAN_PAYMENT_MADE_FULL(3),
    LOAN_PAYMENT_MADE_PERCENT(4),
    LOAN_INTEREST_GENERATED(5),
    LOAN_CLOSED(6);

    private int CODE;

    MovementTypes(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }

}
