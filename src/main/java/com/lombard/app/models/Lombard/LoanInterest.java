package com.lombard.app.models.Lombard;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.TypeEnums.LoanPaymentType;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 11/24/16.
 */
@Entity
@Table(name = "LoanInterests",indexes = {
        @Index(name = "loanIdIndex",columnList = "loanId",unique = false),
        @Index(name = "activeIndex",columnList = "active",unique = false),
        @Index(name = "dateIndex",columnList = "createDate",unique = false)

})
public class LoanInterest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "loanInterestId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "loanId")
    @JsonIgnore
    private Loan loan;

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

    public LoanInterest(Loan loan, float sum, float percent, Date dueDate) {
        this.loan = loan;
        this.sum = sum;
        this.percent = percent;
        this.dueDate = dueDate;
        this.createDate = new Date();
        this.active=true;
        this.payed=false;
        this.payedSum=0;
    }
    public LoanInterest(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Loan getLoan() {
        return loan;
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
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

}
