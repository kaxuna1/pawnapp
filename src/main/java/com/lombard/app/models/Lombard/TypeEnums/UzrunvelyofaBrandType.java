package com.lombard.app.models.Lombard.TypeEnums;

/**
 * Created by kaxa on 11/29/16.
 */
public enum  UzrunvelyofaBrandType {
    MOBILE(1),
    LAPTOP(2),
    BOTH(3),
    HOMETECH(4);

    private int CODE;

    UzrunvelyofaBrandType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }

}
