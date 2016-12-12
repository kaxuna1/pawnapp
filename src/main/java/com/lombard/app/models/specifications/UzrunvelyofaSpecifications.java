package com.lombard.app.models.specifications;

import com.lombard.app.Repositorys.Lombard.BrandRepo;
import com.lombard.app.models.Lombard.Dictionary.Brand;
import com.lombard.app.models.Lombard.Dictionary.Brand_;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa_;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kakha on 12/12/2016.
 */
public class UzrunvelyofaSpecifications {


    public static Specification<Uzrunvelyofa> brand(long brand, BrandRepo brandRepo) {
        return new Specification<Uzrunvelyofa>() {
            @Override
            public Predicate toPredicate(Root<Uzrunvelyofa> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Brand> brands=new ArrayList<>();
                brands.add(brandRepo.findOne(brand));
                Expression<Brand> expression=root.get(Uzrunvelyofa_.brand);
                Predicate brandP=expression.in(brands);
                return cb.and(brandP);

            }
        };
    }
}
