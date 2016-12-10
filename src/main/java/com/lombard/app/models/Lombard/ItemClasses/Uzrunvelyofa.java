package com.lombard.app.models.Lombard.ItemClasses;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.StaticData;
import com.lombard.app.models.Lombard.Dictionary.Brand;
import com.lombard.app.models.Lombard.Dictionary.Sinji;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.MovementModels.UzrunvelyofaMovement;
import com.lombard.app.models.Lombard.TypeEnums.UzrunvelyofaStatusTypes;

import javax.persistence.*;
import java.util.List;

/**
 * Created by kaxa on 11/29/16.
 */
@Entity
@Table(name = "Uzrunvelyofa")
public class Uzrunvelyofa {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "uzrunvelyofaId")
    private long id;


    @Column
    private String model;

    @Column
    private String name;

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
    private String IMEI;
    @Column
    private int type;
    @Column
    private int status;

    @Column
    private Float mass;


    @ManyToOne
    @JoinColumn(name = "loanId")
    @JsonIgnore
    private Loan loan;

    @Column
    private boolean active;


    @ManyToOne
    @JoinColumn(name = "brandId")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "sinjiId")
    private Sinji sinji;

    @OneToMany(mappedBy = "uzrunvelyofa", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UzrunvelyofaMovement> uzrunvelyofaMovements;

    public Uzrunvelyofa() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Loan getLoan() {
        return loan;
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getIMEI() {
        return IMEI;
    }

    public void setIMEI(String IMEI) {
        this.IMEI = IMEI;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public void confiscate() {
        this.setStatus(UzrunvelyofaStatusTypes.DAKAVEBULI.getCODE());
        this.uzrunvelyofaMovements.add(new UzrunvelyofaMovement("მოხდა კონფისკაცია",
                UzrunvelyofaStatusTypes.DAKAVEBULI.getCODE(), this));
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<UzrunvelyofaMovement> getUzrunvelyofaMovements() {
        return uzrunvelyofaMovements;
    }

    public void setUzrunvelyofaMovements(List<UzrunvelyofaMovement> uzrunvelyofaMovements) {
        this.uzrunvelyofaMovements = uzrunvelyofaMovements;
    }

    public void free() {
        this.setStatus(UzrunvelyofaStatusTypes.GATAVISUFLEBULI.getCODE());
        this.uzrunvelyofaMovements.add(new UzrunvelyofaMovement("გათავისუფლდა სესხისგან",
                UzrunvelyofaStatusTypes.GATAVISUFLEBULI.getCODE(), this));
    }

    public float getLeftToPayForLoanClose() {
        return loan.getSumForLoanClose();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Sinji getSinji() {
        return sinji;
    }

    public void setSinji(Sinji sinji) {
        this.sinji = sinji;
    }

    public Float getMass() {
        return mass;
    }

    public void setMass(Float mass) {
        this.mass = mass;
    }

    public Long getLoanId(){
        return loan.getId();
    }
    public String getLoanNumber(){
        return loan.getNumber();
    }
    public Float  getAddedSum(){
        return StaticData.loanInterestRepo.findLoanInterestSum(this.loan);
    }
    public Float getPayedSum(){
        Float loanPaymentSum = StaticData.loanPaymentRepo.findLoanPaymentSum(this.loan);
        return loanPaymentSum==null?0:loanPaymentSum;
    }
}
