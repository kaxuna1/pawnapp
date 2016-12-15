package com.lombard.app.models.Lombard.Dictionary;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.TypeEnums.LoanConditionPeryodType;

import javax.persistence.*;
import java.util.List;

/**
 * Created by kaxa on 11/23/16.
 */

@Entity
@Table(name = "LoanConditions")
public class LoanCondition {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "loanConditionlId")
    private long id;

    @Column
    private float percent;

    @Column
    private int period;

    @Column
    private int periodType;
    @Column
    private String name;
    @Column
    private float firstDayPercent;


    @JsonIgnore
    @OneToMany(mappedBy = "loanCondition",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Uzrunvelyofa> uzrunvelyofas;

    @ManyToOne
    @JoinColumn(name = "filialId")
    @JsonIgnore
    private Filial filial;
    @Column
    private boolean active;


    public LoanCondition(float percent, int period, int periodType,Filial filial,String name,float firstDayPercent) {
        this.percent = percent;
        this.period = period;
        this.periodType = periodType;
        this.filial=filial;
        this.active=true;
        this.name=name;
        this.firstDayPercent=firstDayPercent;
    }
    public LoanCondition(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float PercentLogical(boolean secondDay) {
        if (secondDay)
        return percent-firstDayPercent;
        else return percent;
    }
    public float getPercent(){
        return percent;
    }

    public void setPercent(float percent) {
        this.percent = percent;
    }

    public int getPeriod() {
        return period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }

    public int getPeriodType() {
        return periodType;
    }

    public void setPeriodType(int periodType) {
        this.periodType = periodType;
    }

    public List<Uzrunvelyofa> getLoans() {
        return uzrunvelyofas;
    }

    public void setLoans(List<Uzrunvelyofa> uzrunvelyofas) {
        this.uzrunvelyofas = uzrunvelyofas;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getFullname(){

        String periodTypeString=this.periodType== LoanConditionPeryodType.DAY.getCODE()?" დღე":
                (this.periodType== LoanConditionPeryodType.WEEK.getCODE()?" კვირა":" თვე");

        return this.name+" "+this.percent+"% ყოველ "+this.period+periodTypeString+"ში";
    }

    public float getFirstDayPercent() {
        return firstDayPercent;
    }

    public void setFirstDayPercent(float firstDayPercent) {
        this.firstDayPercent = firstDayPercent;
    }
}
