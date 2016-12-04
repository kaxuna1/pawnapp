package com.lombard.app.models.Lombard.ItemClasses;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.Dictionary.LaptopBrand;
import com.lombard.app.models.Lombard.Loan;


import javax.persistence.*;

/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "Laptops")
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "laptopId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "laptopBrandId")
    @JsonIgnore
    private LaptopBrand laptopBrand;

    @Column
    private String model;

    @Column
    private String cpu;

    @Column
    private String ram;

    @Column
    private String hdd;

    @Column
    private String gpu;
    @Column
    private String number;
    @Column
    private String comment;
    @Column
    private float sum;

    @Column
    private boolean active;

    public Laptop(LaptopBrand laptopBrand, String model,Loan loan) {
        this.laptopBrand = laptopBrand;
        this.model = model;
        this.active=true;
    }
    public Laptop(){}


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LaptopBrand getLaptopBrand() {
        return laptopBrand;
    }

    public void setLaptopBrand(LaptopBrand laptopBrand) {
        this.laptopBrand = laptopBrand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getCpu() {
        return cpu;
    }

    public void setCpu(String cpu) {
        this.cpu = cpu;
    }

    public String getRam() {
        return ram;
    }

    public void setRam(String ram) {
        this.ram = ram;
    }

    public String getHdd() {
        return hdd;
    }

    public void setHdd(String hdd) {
        this.hdd = hdd;
    }

    public String getGpu() {
        return gpu;
    }

    public void setGpu(String gpu) {
        this.gpu = gpu;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
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

    public float getSum() {
        return sum;
    }

    public void setSum(float sum) {
        this.sum = sum;
    }

    public String getBrandName(){
        return this.laptopBrand.getName();
    }

    public void confiscate() {

    }
}
