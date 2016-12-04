package com.lombard.app.models.Enum;

/**
 * Created by kaxa on 9/4/16.
 */
public enum ProjectStageActionExpenseMovementType {
    Registered(1),
    ValueChanged(2);

    private int CODE;

    ProjectStageActionExpenseMovementType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
