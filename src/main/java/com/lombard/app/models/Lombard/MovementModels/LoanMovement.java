package com.lombard.app.models.Lombard.MovementModels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.Loan;


import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxa on 11/23/16.
 */
@Entity
@Table(name = "LoanMovements")
public class LoanMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "loanMovementId")
    private long id;

    @Column
    private String text;

    @Column
    private int type;

    @Column
    private boolean active;

    @Column
    private Date createDate;

    @ManyToOne
    @JoinColumn(name = "loanId")
    @JsonIgnore
    private Loan loan;

    public LoanMovement(String text, int type,Loan loan) {
        this.text = text;
        this.type = type;
        this.loan = loan;
        this.active=true;
        this.createDate=new Date();
    }
    public LoanMovement(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

    public Loan getLoan() {
        return loan;
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
    }
}
