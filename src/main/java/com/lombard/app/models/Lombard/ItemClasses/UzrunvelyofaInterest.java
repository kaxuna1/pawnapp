package com.lombard.app.models.Lombard.ItemClasses;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kakha on 12/15/2016.
 */
@Entity
@Table(name = "LoanInterests",indexes = {
        @Index(name = "loanIdIndex",columnList = "loanId",unique = false),
        @Index(name = "activeIndex",columnList = "active",unique = false),
        @Index(name = "dateIndex",columnList = "createDate",unique = false)

})
public class UzrunvelyofaInterest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "uzrunvelyofaInterestId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "uzrunvelyofaId")
    @JsonIgnore
    private Uzrunvelyofa uzrunvelyofa;

    @Column
    private float sum;

    @Column
    private float percent;

    @Column
    private Date createDate;

    @Column
    private Date dueDate;

    @Column
    private boolean active;

    @Column
    private boolean payed;

    @Column
    private float payedSum;


    public UzrunvelyofaInterest(Uzrunvelyofa uzrunvelyofa, float sum, float percent, Date dueDate) {
        this.uzrunvelyofa = uzrunvelyofa;
        this.sum = sum;
        this.percent = percent;
        this.dueDate = dueDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Uzrunvelyofa getUzrunvelyofa() {
        return uzrunvelyofa;
    }

    public void setUzrunvelyofa(Uzrunvelyofa uzrunvelyofa) {
        this.uzrunvelyofa = uzrunvelyofa;
    }

    public float getSum() {
        return sum;
    }

    public void setSum(float sum) {
        this.sum = sum;
    }

    public float getPercent() {
        return percent;
    }

    public void setPercent(float percent) {
        this.percent = percent;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isPayed() {
        return payed;
    }

    public void setPayed(boolean payed) {
        this.payed = payed;
    }

    public float getPayedSum() {
        return payedSum;
    }

    public void setPayedSum(float payedSum) {
        this.payedSum = payedSum;
    }
    public float getLeftToPay(){
        return this.sum-this.payedSum;
    }

    public void checkIfIsPayed() {
        if(getLeftToPay()<=0){
            this.setPayed(true);
        }
    }
    public void addToPayedSum(float val) {
        this.payedSum+=val;
    }
}
