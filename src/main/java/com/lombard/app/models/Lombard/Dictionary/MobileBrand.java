package com.lombard.app.models.Lombard.Dictionary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.ItemClasses.MobilePhone;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "MobileBrands")
public class MobileBrand {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "mobileBrandId")
    private long id;

    @Column
    private String name;


    @OneToMany(mappedBy = "mobileBrand", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<MobilePhone> mobilePhones;

    @Column
    private boolean isActive;

    public MobileBrand(String name) {
        this.name = name;
        this.mobilePhones=new ArrayList<>();
        this.isActive=true;
    }
    public MobileBrand(){}

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

    public List<MobilePhone> getMobilePhones() {
        return mobilePhones;
    }

    public void setMobilePhones(List<MobilePhone> mobilePhones) {
        this.mobilePhones = mobilePhones;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
