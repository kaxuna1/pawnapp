package com.lombard.app.models.Enum;

/**
 * Created by kaxa on 9/2/16.
 */
public enum ProjectStageActionMovementType {
    Registered(1),
    finishedByPrarab(4),
    inProgress(5),
    sentToPrarab(6),
    expectingElements(7);

    private int CODE;

    ProjectStageActionMovementType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
