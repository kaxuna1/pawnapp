package com.lombard.app.models.Enum;

/**
 * Created by kaxa on 8/31/16.
 */
public enum ProjectMovementType {
    Registered(1),
    InfoChanged(2),
    prarabAdded(3),
    prarabRemoved(4),
    InProgress(5);

    private int CODE;

    ProjectMovementType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
