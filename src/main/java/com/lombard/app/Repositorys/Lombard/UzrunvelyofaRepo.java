package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.ItemClasses.Uzrunvelyofa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by kaxa on 11/29/16.
 */
public interface UzrunvelyofaRepo extends JpaRepository<Uzrunvelyofa,Long> {
    @Query(value = "select u from Uzrunvelyofa u join u.brand b join u.loan l join l.client c where" +
            " u.status=:status and u.active=1 and l.filial=:filial and (" +
            " upper(b.name)  LIKE CONCAT('%',upper(:search),'%') or" +
            " u.model LIKE CONCAT('%',:search,'%') or" +
            " u.IMEI  LIKE CONCAT('%',:search,'%') or" +
            " c.personalNumber LIKE CONCAT('%',:search,'%'))")
    Page<Uzrunvelyofa> findForFilial(@Param("search") String search, @Param("status") int status, @Param("filial") Filial filial, Pageable pageable);
}
