package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Client;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 11/29/16.
 */
@Transactional
public interface UzrunvelyofaRepo extends JpaRepository<Uzrunvelyofa,Long> {
    @Query(value = "select u from Uzrunvelyofa u join u.brand b join u.loan l join l.client c where" +
            " u.status in :statuses and u.active=1 and l.filial=:filial and (" +
            " upper(b.name)  LIKE CONCAT('%',upper(:search),'%') or" +
            " u.model LIKE CONCAT('%',:search,'%') or" +
            " u.IMEI  LIKE CONCAT('%',:search,'%') or" +
            " c.personalNumber LIKE CONCAT('%',:search,'%'))")
    Page<Uzrunvelyofa> findForFilial(@Param("search") String search,
                                     @Param("filial") Filial filial,
                                     @Param("statuses")List<Integer> statuses, Pageable pageable);

    @Query("select u from Uzrunvelyofa u join u.loan l where " +
            "l in (select l from l where l.isActive=true and l.client=:client) and u.active=true order by l.createDate desc ")
    Page<Uzrunvelyofa> findClientsUzrunvelyofa( @Param("client") Client client,  Pageable constructPageSpecification);
}
