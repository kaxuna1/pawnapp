package com.lombard.app.models.Lombard.Dictionary;

import javax.persistence.*;

/**
 * Created by kaxa on 11/16/16.
 */

@Entity
@Table(name = "LaptopModels")
public class LaptopModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "laptopModelId")
    private long id;
}
