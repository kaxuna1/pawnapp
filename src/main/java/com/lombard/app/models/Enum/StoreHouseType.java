package com.lombard.app.models.Enum;

/**
 * Created by kaxa on 9/7/16.
 */
public enum  StoreHouseType {
    ProjectStore(1),
    CompanyStore(2);
    private int CODE;

    StoreHouseType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
