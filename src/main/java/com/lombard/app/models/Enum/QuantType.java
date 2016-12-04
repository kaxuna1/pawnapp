package com.lombard.app.models.Enum;

/**
 * Created by kakha on 11/24/2015.
 */
public enum QuantType {

    KG(1),
    NUMBER(2);

    private int CODE;
    QuantType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
