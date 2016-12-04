package com.lombard.app.models;

/**
 * Created by vakhtanggelashvili on 11/3/15.
 */
public class JsonMessage {
    public JsonMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }
    public JsonMessage(){

    }

    private int code;
    private String message;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
