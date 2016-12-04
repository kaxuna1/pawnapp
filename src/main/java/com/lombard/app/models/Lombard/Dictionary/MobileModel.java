package com.lombard.app.models.Lombard.Dictionary;

import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.util.List;

/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "MobileModels")
public class MobileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "mobileModelId")
    private long id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "mobileBrandId")
    private MobileBrand mobileBrand;

    @Column
    private boolean isActive;

    public MobileModel(String name,MobileBrand mobileBrand) {
        this.mobileBrand=mobileBrand;
        this.name = name;
        this.isActive=true;
    }
    public MobileModel(){}


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
