package com.lombard.app.models.Enum;

/**
 * Created by kaxa on 9/7/16.
 */
public enum CompanyItemMovementType {
    Registered(1),
    Removed(2),
    AssignedToProject(3),
    AsignedToStore(4);


    private int CODE;

    CompanyItemMovementType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
