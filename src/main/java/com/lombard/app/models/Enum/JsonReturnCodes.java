package com.lombard.app.models.Enum;

/**
 * Created by vakhtanggelashvili on 11/3/15.
 */
public enum JsonReturnCodes {
    Ok(0),
    USEREXISTS(1),
    ERROR(3),
    BARRCODEEXISTS(4),
    NOTLOGGEDIN(5),
    SESSIONEXPIRED(6),
    DONTHAVEPERMISSION(7),
    REGIONDOESNOTEXIST(8),
    PARENTNOTFINISHED(9),
    ACTIONALLREADYINPROGRESS(10),
    ACTIONOTINPROGRESS(11),
    LOGICERROR(12);

    private int CODE;

    JsonReturnCodes(int i) {
        this.CODE = i;
    }

    public int getCODE() {
        return CODE;
    }

}
