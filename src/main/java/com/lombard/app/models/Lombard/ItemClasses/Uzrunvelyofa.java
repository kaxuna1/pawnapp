package com.lombard.app.models.Lombard.ItemClasses;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.StaticData;
import com.lombard.app.models.Lombard.Dictionary.Brand;
import com.lombard.app.models.Lombard.Dictionary.LoanCondition;
import com.lombard.app.models.Lombard.Dictionary.Sinji;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.LoanInterest;
import com.lombard.app.models.Lombard.MovementModels.LoanMovement;
import com.lombard.app.models.Lombard.MovementModels.UzrunvelyofaMovement;
import com.lombard.app.models.Lombard.TypeEnums.LoanConditionPeryodType;
import com.lombard.app.models.Lombard.TypeEnums.MovementTypes;
import com.lombard.app.models.Lombard.TypeEnums.UzrunvelyofaStatusTypes;
import org.joda.time.DateTime;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.function.Predicate;
import java.util.function.ToDoubleFunction;
import java.util.stream.Collector;

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
    private Float hdd;
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

    @OneToMany(mappedBy = "uzrunvelyofa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<UzrunvelyofaInterest> uzrunvelyofaInterests;

    @ManyToOne
    @JoinColumn(name = "loanId")
    @JsonIgnore
    private Loan loan;

    @Column
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "loanConditionId")
    private LoanCondition loanCondition;


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

    public void addInterest() {

        DateTime dateTime = new DateTime();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.DAY.getCODE())
            loan.nextInterestCalculationDate = dateTime.plusDays(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.WEEK.getCODE())
            loan.nextInterestCalculationDate = dateTime.plusWeeks(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.MONTH.getCODE())
            loan.nextInterestCalculationDate = dateTime.plusMonths(loanCondition.getPeriod()).toDate();
        if (loan.onFirstInterest)
            loan.nextInterestCalculationDate = new DateTime(loan.nextInterestCalculationDate).minusDays(1).toDate();

        if(this.loanCondition.PercentLogical(loan.isOnFirstInterest())>0) {
            UzrunvelyofaInterest loanInterest=                    new UzrunvelyofaInterest(this,
                    (((this.getUzrunvelyofaLeftToPay()) / 100) * this.loanCondition.PercentLogical(loan.isOnFirstInterest())),
                    this.loanCondition.PercentLogical(loan.isOnFirstInterest()), loan.nextInterestCalculationDate);
            this.uzrunvelyofaInterests.add(loanInterest);
        }
    }
    public void addFirstInterest() {
        Date date = new Date();
        DateTime dateTime = new DateTime();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.DAY.getCODE())
            date = dateTime.plusDays(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.WEEK.getCODE())
            date = dateTime.plusWeeks(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.MONTH.getCODE())
            date = dateTime.plusMonths(loanCondition.getPeriod()).toDate();
        if (this.getLoanCondition().getFirstDayPercent() > 0) {

            float sum = ((getUzrunvelyofaLeftToPay() / 100) * this.loanCondition.getFirstDayPercent());
            UzrunvelyofaInterest interest = new UzrunvelyofaInterest(this,
                    sum,
                    this.loanCondition.getFirstDayPercent(), date);
            this.uzrunvelyofaInterests.add(interest);
            loan.movements.add(new LoanMovement("დაეკისრა პროცენტი " + sum + "ლარი", MovementTypes.LOAN_INTEREST_GENERATED.getCODE(), this.loan));
        }
        if (this.getLoanCondition().getPercent() == this.getLoanCondition().getFirstDayPercent()) {
            loan.nextInterestCalculationDate = date;
        } else {
            loan.nextInterestCalculationDate = new DateTime().plusDays(1).toDate();
        }

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

    public Float getHdd() {
        return hdd;
    }

    public void setHdd(Float hdd) {
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

    public boolean isReadyToFree(){
        if(this.status!=UzrunvelyofaStatusTypes.DATVIRTULI.getCODE())
            return false;


        boolean readyToFree=true;
        float loanSum=loan.getLoanSum();
        float loanSumLeft=loan.getLeftSum();
        float loanPercentToPay=loan.getInterestSumLeft();
        float loanPayedSum=loanSum-loanSumLeft;
        float usedSumFromLoanPayedSum= (float) (loan.getUzrunvelyofas()
                        .stream()
                        .filter(uzrunvelyofa -> uzrunvelyofa.status==UzrunvelyofaStatusTypes.GATANILI_PATRONIS_MIER.getCODE())
                        .mapToDouble(value -> value.sum).sum());
        float neadToBeMoreThanThis=usedSumFromLoanPayedSum+this.sum;
        if(loanPercentToPay>0)
            readyToFree=false;
        if(loanPayedSum<neadToBeMoreThanThis){
            readyToFree=false;
        }

        return readyToFree;
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

    public List<UzrunvelyofaInterest> getUzrunvelyofaInterests() {
        return uzrunvelyofaInterests;
    }

    public float getUzrunvelyofaLeftToPay(){
        return (this.sum/100)*(loan.getLeftSum()/(loan.getLoanSum()/100));
    }

    public void setUzrunvelyofaInterests(List<UzrunvelyofaInterest> uzrunvelyofaInterests) {
        this.uzrunvelyofaInterests = uzrunvelyofaInterests;
    }

    public LoanCondition getLoanCondition() {
        return loanCondition;
    }

    public void setLoanCondition(LoanCondition loanCondition) {
        this.loanCondition = loanCondition;
    }
}
