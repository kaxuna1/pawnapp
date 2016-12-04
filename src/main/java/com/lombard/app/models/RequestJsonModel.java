package com.lombard.app.models;

import java.io.Serializable;

/**
 * Created by kakha on 9/5/2016.
 */
public class RequestJsonModel implements Serializable {
    private long id;
    private float sum;

    public RequestJsonModel(long id, float sum) {
        this.id = id;
        this.sum = sum;
    }
    public RequestJsonModel() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getSum() {
        return sum;
    }

    public void setSum(float sum) {
        this.sum = sum;
    }
}
