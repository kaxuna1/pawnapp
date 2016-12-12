package com.lombard.app.models.Lombard.Dictionary;

import com.lombard.app.models.Lombard.Dictionary.Brand;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * Created by kakha on 12/12/2016.
 */

@StaticMetamodel(Brand.class)
public class Brand_ {
    public static volatile SingularAttribute<Brand, Long> id;
    public static volatile SingularAttribute<Brand, String> name;
}
