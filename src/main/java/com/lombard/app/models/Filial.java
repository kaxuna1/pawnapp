package com.lombard.app.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.Client;
import com.lombard.app.models.Lombard.Dictionary.LoanCondition;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.UserManagement.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by vakhtanggelashvili on 10/22/15.
 */
@Entity
@Table(name = "Filials")
public class Filial {

    @Id
    @Column(name = "filialId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Column
    private String name;

    @NotNull
    @Column
    private String address;

    @JsonIgnore
    @OneToMany(mappedBy = "filial",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<User> users;

    @JsonIgnore
    @OneToMany(mappedBy = "filial",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Loan> loans;

    @JsonIgnore
    @OneToMany(mappedBy = "filial",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Client> clients;

    @Column
    private boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "filial",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<LoanCondition> loanConditions;


    public Filial(String name, String address) {
        this.name = name;
        this.address = address;
        this.users=new ArrayList<User>();
        this.loans=new ArrayList<>();
        this.clients=new ArrayList<>();
        this.loanConditions=new ArrayList<>();
        this.active=true;
    }
    public Filial(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public long getId() {
        return id;
    }


    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Loan> getLoans() {
        return loans;
    }

    public void setLoans(List<Loan> loans) {
        this.loans = loans;
    }

    public List<Client> getClients() {
        return clients;
    }

    public void setClients(List<Client> clients) {
        this.clients = clients;
    }

    public List<LoanCondition> getLoanConditions() {
        return loanConditions;
    }

    public void setLoanConditions(List<LoanCondition> loanConditions) {
        this.loanConditions = loanConditions;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
