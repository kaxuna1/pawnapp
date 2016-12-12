package com.lombard.app.models.specifications;

import com.lombard.app.Repositorys.Lombard.BrandRepo;
import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Dictionary.Brand;
import com.lombard.app.models.Lombard.Dictionary.Sinji;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa_;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.Loan_;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kakha on 12/12/2016.
 */
public class UzrunvelyofaSpecifications {


    public static Specification<Uzrunvelyofa> brand(List<Long> brand, BrandRepo brandRepo) {
        return (root, query, cb) -> {
            List<Brand> brands = new ArrayList<>();
            brands.addAll(brandRepo.findByIdIn(brand));
            return root.get(Uzrunvelyofa_.brand).in(brands);

        };
    }

    public static Specification<Uzrunvelyofa> filialSpec(Filial filial) {
        return (root, query, cb) -> {

            Join<Uzrunvelyofa, Loan> loan = root.join(Uzrunvelyofa_.loan, JoinType.LEFT);

            return cb.equal(loan.get(Loan_.filial), filial);
        };
    }

    public static Specification<Uzrunvelyofa> active() {
        return (root, query, cb) -> cb.equal(root.get(Uzrunvelyofa_.active), true);
    }

    public static Specification<Uzrunvelyofa> sinjiSpec(List<Sinji> sinjis) {
        return ((root, query, cb) -> root.get(Uzrunvelyofa_.sinji).in(sinjis));
    }

    public static Specification<Uzrunvelyofa> modelLike(String model) {
        return (((root, query, cb) -> cb.like(root.get(Uzrunvelyofa_.model), "%" + model + "%")));
    }

    public static Specification<Uzrunvelyofa> nameLike(String name) {
        return ((root, query, cb) -> cb.like(root.get(Uzrunvelyofa_.name), "%" + name + "%"));
    }

    public static Specification<Uzrunvelyofa> statuses(List<Integer> statuses) {
        return (root, query, cb) -> root.get(Uzrunvelyofa_.status).in(statuses);
    }

    public static Specification<Uzrunvelyofa> typeSpec(int type) {
        return ((root, query, cb) -> cb.equal(root.get(Uzrunvelyofa_.type), type));
    }
}
