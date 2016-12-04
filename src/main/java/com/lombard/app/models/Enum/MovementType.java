package com.lombard.app.models.Enum;

/**
 * Created by KGelashvili on 10/23/2015.
 */
public enum MovementType {

    Registered(1),
    ReceivedByCourier(2),
    ArrivedAtOffice(3),
    handledToCourier(4),
    Delivered(5);


    private int CODE;

    MovementType(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
