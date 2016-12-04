package com.lombard.app.models.Lombard.MovementModels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;


import javax.persistence.*;
import javax.xml.crypto.Data;
import java.util.Date;

/**
 * Created by kaxa on 11/29/16.
 */
@Entity
@Table(name = "UzrunvelyofaMovement")
public class UzrunvelyofaMovement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "uzrunvelyofaMovementId")
    private long id;

    @Column
    private String text;

    @Column
    private Date date;

    @Column
    private int type;


    @ManyToOne
    @JoinColumn(name = "uzrunvelyofaId")
    @JsonIgnore
    private Uzrunvelyofa uzrunvelyofa;

    public UzrunvelyofaMovement(String text, int type, Uzrunvelyofa uzrunvelyofa) {
        this.text = text;
        this.type = type;
        this.date=new Date();
        this.uzrunvelyofa = uzrunvelyofa;
    }
    public UzrunvelyofaMovement(){}

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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Uzrunvelyofa getUzrunvelyofa() {
        return uzrunvelyofa;
    }

    public void setUzrunvelyofa(Uzrunvelyofa uzrunvelyofa) {
        this.uzrunvelyofa = uzrunvelyofa;
    }
}
