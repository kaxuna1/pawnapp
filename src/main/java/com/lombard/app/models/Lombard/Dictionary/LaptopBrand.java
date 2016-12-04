package com.lombard.app.models.Lombard.Dictionary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.ItemClasses.Laptop;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "LaptopBrands")
public class LaptopBrand {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "laptopBrandId")
    private long id;


    @Column
    private String name;

    @Column
    private boolean active;


    @OneToMany(mappedBy = "laptopBrand", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Laptop> laptops;

    public LaptopBrand(String name) {
        this.name = name;
        this.active=true;
        this.laptops=new ArrayList<>();
    }
    public LaptopBrand(){}

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

    public List<Laptop> getLaptops() {
        return laptops;
    }

    public void setLaptops(List<Laptop> laptops) {
        this.laptops = laptops;
    }
}
