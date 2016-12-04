package com.lombard.app.models.Lombard.Dictionary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kaxa on 11/29/16.
 */

@Entity
@Table(name = "Brands")
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "brandId")
    private long id;


    @Column
    private String name;

    @Column
    private boolean active;

    @Column
    private int type;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Uzrunvelyofa> uzrunvelyofas;


    public Brand(){

    }
    public Brand(String name,int type){
        this.name=name;
        this.type=type;
        this.active=true;
        this.uzrunvelyofas=new ArrayList<>();

    }





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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public List<Uzrunvelyofa> getUzrunvelyofas() {
        return uzrunvelyofas;
    }

    public void setUzrunvelyofas(List<Uzrunvelyofa> uzrunvelyofas) {
        this.uzrunvelyofas = uzrunvelyofas;
    }
}
