package com.lombard.app.models.Lombard.Dictionary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;

import javax.persistence.*;
import java.util.List;

/**
 * Created by kaxa on 12/8/16.
 */
@Entity
@Table(name = "Sinji")
public class Sinji {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "sinjiId")
    private long id;


    @Column
    private String name;

    @Column
    private boolean active;

    @OneToMany(mappedBy = "sinji", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Uzrunvelyofa> uzrunvelyofas;

    public Sinji(){}
    public Sinji(String name){
        this.name=name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<Uzrunvelyofa> getUzrunvelyofas() {
        return uzrunvelyofas;
    }

    public void setUzrunvelyofas(List<Uzrunvelyofa> uzrunvelyofas) {
        this.uzrunvelyofas = uzrunvelyofas;
    }
}
