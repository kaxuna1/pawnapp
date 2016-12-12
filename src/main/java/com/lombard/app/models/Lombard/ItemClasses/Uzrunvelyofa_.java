package com.lombard.app.models.Lombard.ItemClasses;

import com.lombard.app.models.Lombard.Dictionary.Brand;
import com.lombard.app.models.Lombard.Dictionary.Sinji;
import com.lombard.app.models.Lombard.Loan;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * Created by kakha on 12/12/2016.
 */
@StaticMetamodel(Uzrunvelyofa.class)
public class Uzrunvelyofa_ {
    public static volatile SingularAttribute<Uzrunvelyofa, Long> id;
    public static volatile SingularAttribute<Uzrunvelyofa, String> model;
    public static volatile SingularAttribute<Uzrunvelyofa, String> name;
    public static volatile SingularAttribute<Uzrunvelyofa, Brand> brand;
    public static volatile SingularAttribute<Uzrunvelyofa, Sinji> sinji;
    public static volatile SingularAttribute<Uzrunvelyofa, Integer> status;
    public static volatile SingularAttribute<Uzrunvelyofa, Integer> type;
    public static volatile SingularAttribute<Uzrunvelyofa, Boolean> active;
    public static volatile SingularAttribute<Uzrunvelyofa, Loan> loan;

}
