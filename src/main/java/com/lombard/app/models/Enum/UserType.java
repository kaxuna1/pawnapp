package com.lombard.app.models.Enum;

/**
 * Created by KGelashvili on 10/22/2015.
 */
public enum UserType {
    sa(1),
    admin(2),
    prarab(3),
    manager(4),
    shesyidvebi(5),
    lombardOperator(21),
    lombardManager(22),
    lombardClient(23);
    private int CODE;

    UserType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
