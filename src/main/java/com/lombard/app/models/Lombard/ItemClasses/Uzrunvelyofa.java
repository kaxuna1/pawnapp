package com.lombard.app.models.Lombard.ItemClasses;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.StaticData;
import com.lombard.app.models.Lombard.Dictionary.Brand;
import com.lombard.app.models.Lombard.Dictionary.LoanCondition;
import com.lombard.app.models.Lombard.Dictionary.Sinji;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.LoanInterest;
import com.lombard.app.models.Lombard.LoanPayment;
import com.lombard.app.models.Lombard.MovementModels.LoanMovement;
import com.lombard.app.models.Lombard.MovementModels.UzrunvelyofaMovement;
import com.lombard.app.models.Lombard.TypeEnums.LoanConditionPeryodType;
import com.lombard.app.models.Lombard.TypeEnums.LoanPaymentType;
import com.lombard.app.models.Lombard.TypeEnums.MovementTypes;
import com.lombard.app.models.Lombard.TypeEnums.UzrunvelyofaStatusTypes;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.joda.time.DateTime;

import javax.persistence.*;
import java.util.ArrayList;
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

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "uzrunvelyofa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<LoanPayment> payments;

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

    @Column
    private Date nextInterestCalculationDate;

    @Column
    private boolean onFirstInterest;


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
        if(this.status!=UzrunvelyofaStatusTypes.DATVIRTULI.getCODE())
            return;

        DateTime dateTime = new DateTime();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.DAY.getCODE())
            this.nextInterestCalculationDate = dateTime.plusDays(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.WEEK.getCODE())
            this.nextInterestCalculationDate = dateTime.plusWeeks(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.MONTH.getCODE())
            this.nextInterestCalculationDate = dateTime.plusMonths(loanCondition.getPeriod()).toDate();
        if (this.onFirstInterest)
            this.nextInterestCalculationDate = new DateTime(this.nextInterestCalculationDate).minusDays(1).toDate();

        if (this.loanCondition.PercentLogical(this.isOnFirstInterest()) > 0) {
            UzrunvelyofaInterest loanInterest = new UzrunvelyofaInterest(this,
                    (((this.getLeftToPay()) / 100) * this.loanCondition.PercentLogical(this.isOnFirstInterest())),
                    this.loanCondition.PercentLogical(this.isOnFirstInterest()), this.nextInterestCalculationDate);
            this.uzrunvelyofaInterests.add(loanInterest);
        }
        this.onFirstInterest=false;
    }

    public void addFirstInterest() {
        if(this.status!=UzrunvelyofaStatusTypes.DATVIRTULI.getCODE())
            return;
        Date date = new Date();
        DateTime dateTime = new DateTime();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.DAY.getCODE())
            date = dateTime.plusDays(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.WEEK.getCODE())
            date = dateTime.plusWeeks(loanCondition.getPeriod()).toDate();
        if (loanCondition.getPeriodType() == LoanConditionPeryodType.MONTH.getCODE())
            date = dateTime.plusMonths(loanCondition.getPeriod()).toDate();
        if (this.getLoanCondition().getFirstDayPercent() > 0) {


            float sum = ((getLeftToPay() / 100) * this.loanCondition.getFirstDayPercent());

            UzrunvelyofaInterest interest = new UzrunvelyofaInterest(this, sum, this.loanCondition.getFirstDayPercent(), date);

            this.uzrunvelyofaInterests.add(interest);


            loan.movements.add(new LoanMovement("დაეკისრა პროცენტი " + sum + "ლარი", MovementTypes.LOAN_INTEREST_GENERATED.getCODE(), this.loan));
        }
        if (this.getLoanCondition().getPercent() == this.getLoanCondition().getFirstDayPercent()) {
            this.nextInterestCalculationDate = date;
        } else {
            this.nextInterestCalculationDate = new DateTime().plusDays(1).toDate();
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

    public boolean isReadyToFree() {
        if (this.status != UzrunvelyofaStatusTypes.DATVIRTULI.getCODE())
            return false;
        return this.getLeftToPay() <= 0 && this.getInterestsLeftToPay() <= 0;
    }

    public float getInterestsLeftToPay() {
        return (float) this.uzrunvelyofaInterests.stream().filter(u -> !u.isPayed()).mapToDouble(UzrunvelyofaInterest::getLeftToPay).sum();
    }

    public Long getLoanId() {
        return loan.getId();
    }

    public String getLoanNumber() {
        return loan.getNumber();
    }

    public Float getAddedSum() {
        return StaticData.loanInterestRepo.findLoanInterestSum(this.loan);
    }

    public Float getPayedSum() {
        double loanPaymentSum = this.payments.stream().mapToDouble(LoanPayment::getSum).sum();
        return (float) loanPaymentSum;
    }

    public List<UzrunvelyofaInterest> getUzrunvelyofaInterests() {
        return uzrunvelyofaInterests;
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

    public void paySum(float sum) {
        LoanPayment loanPayment = new LoanPayment(this.loan, sum, LoanPaymentType.PARTIAL.getCODE());
        loanPayment.setUzrunvelyofa(this);
        this.payments.add(loanPayment);
    }

    public float getLeftToPay() {
        return this.sum -
                (float) this.payments.stream().filter(loanPayment -> loanPayment.getType() == LoanPaymentType.PARTIAL.getCODE())

                        .mapToDouble(LoanPayment::getSum).sum();
    }

    public void payInt(float sum) {
        LoanPayment loanPayment = new LoanPayment(this.loan, sum, LoanPaymentType.PERCENT.getCODE());
        loanPayment.setUzrunvelyofa(this);
        loan.getPayments().add(loanPayment);
        loan.recalculateInterestPayments();
    }

    public Date getNextInterestCalculationDate() {
        return nextInterestCalculationDate;
    }

    public void setNextInterestCalculationDate(Date nextInterestCalculationDate) {
        this.nextInterestCalculationDate = nextInterestCalculationDate;
    }

    public boolean isOnFirstInterest() {
        return onFirstInterest;
    }

    public void setOnFirstInterest(boolean onFirstInterest) {
        this.onFirstInterest = onFirstInterest;
    }

    public void initLists(){
        this.payments=new ArrayList<>();
        this.uzrunvelyofaInterests=new ArrayList<>();
        this.uzrunvelyofaMovements=new ArrayList<>();
    }
    public boolean isOverDue(){
        return this.uzrunvelyofaInterests.stream().filter(UzrunvelyofaInterest::isOverDue).count()>0;
    }
    public float getOverDueInterestSum(){
        return (float)this.uzrunvelyofaInterests.stream()
                .filter(UzrunvelyofaInterest::isOverDue)
                .mapToDouble(UzrunvelyofaInterest::getLeftToPay)
                .sum();
    }
}
