package com.lombard.app.models.Enum;

/**
 * Created by kaxa on 9/6/16.
 */
public enum ProjectStageActionExpenseRequestMovementType {
    Registered(1),
    SentForRevision(2),
    Accapted(3),
    Rejected(4);

    private int CODE;

    ProjectStageActionExpenseRequestMovementType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
