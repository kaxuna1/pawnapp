package com.lombard.app.models.Lombard.ItemClasses;

/**
 * Created by kaxa on 11/16/16.
 */
public enum ItemClassTypes {

    MOBILEPHONE(0),
    LAPTOP(1);

    private int CODE;

    ItemClassTypes(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
