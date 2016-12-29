package com.lombard.app.models.Lombard.ItemClasses;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by kakha on 12/15/2016.
 */
@Entity
@Table(name = "UzrunvelyofaInterest",indexes = {
        @Index(name = "uzIdIndex",columnList = "uzrunvelyofaId",unique = false),
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
        this.createDate=new Date();
    }
    public UzrunvelyofaInterest(){}

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

    public boolean isOverDue(){
        Calendar cal = Calendar.getInstance(); // locale-specific
        cal.setTime(new Date());
        cal.setTimeZone(TimeZone.getTimeZone("Asia/Tbilisi"));
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return dueDate.before(cal.getTime())&&!payed;

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
