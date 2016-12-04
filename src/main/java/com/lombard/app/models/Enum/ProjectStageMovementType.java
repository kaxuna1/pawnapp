package com.lombard.app.models.Enum;

/**
 * Created by kaxa on 8/31/16.
 */
public enum ProjectStageMovementType {
    Registered(1),
    InfoChanged(2),
    Started(3),
    Ended(4),
    Shecherebuli(5);

    private int CODE;

    ProjectStageMovementType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
