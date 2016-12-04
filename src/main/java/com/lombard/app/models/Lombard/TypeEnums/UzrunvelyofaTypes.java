package com.lombard.app.models.Lombard.TypeEnums;

/**
 * Created by kaxa on 11/29/16.
 */
public enum  UzrunvelyofaTypes {
    MOBILE(1),
    LAPTOP(2),
    GOLD(3);

    private int CODE;

    UzrunvelyofaTypes(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
