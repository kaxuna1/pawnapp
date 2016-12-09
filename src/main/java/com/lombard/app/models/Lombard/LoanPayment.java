package com.lombard.app.models.Lombard;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.TypeEnums.LoanPaymentType;


import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 11/23/16.
 */
@Entity
@Table(name = "LoanPayment",indexes = {
        @Index(name = "loanIdIndex",columnList = "loanId",unique = false),
        @Index(name = "activeIndex",columnList = "active",unique = false),
        @Index(name = "dateIndex",columnList = "createDate",unique = false)

})
public class LoanPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "loanPaymentId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "loanId")
    @JsonIgnore
    private Loan loan;

    @Column
    private float sum;

    @Column
    private String number;

    @Column
    private int type;

    @Column
    private float usedSum;

    @Column
    private boolean usedFully;

    @Column
    private boolean active;

    @Column
    private Date createDate;

    public LoanPayment(Loan loan, float sum, int type) {
        this.loan = loan;
        this.sum = sum;
        this.type = type;
        this.number="123";
        this.active=true;
        this.createDate=new Date();
        this.usedFully=false;
        this.usedSum=0f;
        if(type== LoanPaymentType.PARTIAL.getCODE()){
            this.usedFully=true;
            this.usedSum=sum;
        }
    }
    public LoanPayment(){}

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

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public float getUsedSum() {
        return usedSum;
    }

    public void setUsedSum(float usedSum) {
        this.usedSum = usedSum;
    }

    public boolean isUsedFully() {
        return usedFully;
    }

    public void setUsedFully(boolean usedFully) {
        this.usedFully = usedFully;
    }

    public float getLeftForUse(){
        return sum-usedSum;
    }

    public void addToUsedSum(float val) {
        this.usedSum+=val;
    }

    public String getLoanNumber(){
        return loan.getNumber();
    }
}
