package com.lombard.app.models.Lombard;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Filial;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "Clients", indexes = {
        @Index(name = "personalNumberIndex", columnList = "personalNumber", unique = true),
        @Index(name = "nameIndex",columnList = "name"),
        @Index(name = "surNameIndex",columnList = "surname"),
        @Index(name = "filialIndex",columnList = "filialId")
})
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "clientId")
    private long id;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Loan> loans;

    @Column
    private String name;

    @Column
    private String surname;

    @Column
    private String personalNumber;

    @Column
    private String mobile;

    @Column
    private String number;

    @ManyToOne
    @JoinColumn(name = "filialId")
    @JsonIgnore
    private Filial filial;

    @Column
    private Date createDate;


    @Column
    private boolean isActive;

    public Client(String name, String surname, String personalNumber, String mobile, Filial filial) {
        this.name = name;
        this.surname = surname;
        this.personalNumber = personalNumber;
        this.mobile = mobile;
        this.filial = filial;
        this.loans = new ArrayList<>();
        this.isActive = true;
        this.createDate = new Date();

    }

    public Client() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Loan> getLoans() {
        return loans;
    }

    public void setLoans(List<Loan> loans) {
        this.loans = loans;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPersonalNumber() {
        return personalNumber;
    }

    public void setPersonalNumber(String personalNumber) {
        this.personalNumber = personalNumber;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
