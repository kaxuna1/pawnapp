package com.lombard.app.models.Lombard.ItemClasses;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.Dictionary.MobileBrand;
import com.lombard.app.models.Lombard.Loan;


import javax.persistence.*;

/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "MobilePhones")
public class MobilePhone {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "mobilePhoneId")
    private long id;

    @Column
    private String IMEI;

    @ManyToOne
    @JoinColumn(name = "mobileBrandId")
    @JsonIgnore
    private MobileBrand mobileBrand;

    @Column
    private String modelName;

    @Column
    private String number;

    @Column
    private boolean isActive;

    @Column
    private String comment;

    @Column
    private float sum;


    public MobilePhone(String imei, MobileBrand mobileBrand, Loan loan, String comment, String modelName, float sum) {
        IMEI = imei;
        this.mobileBrand = mobileBrand;
        this.comment = comment;
        this.isActive=true;
        this.number="";
        this.modelName=modelName;
    }
    public MobilePhone(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getIMEI() {
        return IMEI;
    }

    public void setIMEI(String IMEI) {
        this.IMEI = IMEI;
    }

    public MobileBrand getMobileBrand() {
        return mobileBrand;
    }

    public void setMobileBrand(MobileBrand mobileBrand) {
        this.mobileBrand = mobileBrand;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public float getSum() {
        return sum;
    }

    public void setSum(float sum) {
        this.sum = sum;
    }

    public String getBrandName(){
        return this.mobileBrand.getName();
    }

    public void confiscate() {

    }
}
