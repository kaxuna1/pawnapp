package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Client;
import com.lombard.app.models.Lombard.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 11/17/16.
 */

@Transactional
public interface LoanRepo extends JpaRepository<Loan,Long> {


    @Query(value = "select l from Loan l join l.filial f where f=:filial " +
            "and l.status in (:statuses) " +
            "and l.isActive=true " +
            "and l.createDate between :start and :end " +
            "order by l.createDate desc")
    Page<Loan> findMyFilialLoans(@Param("filial") Filial filial, @Param("statuses") List<Integer> statuses,
                                 @Param("start") Date start,@Param("end") Date end, Pageable pageable);

    @Query(value = "select l from Loan l " +
            "join l.filial f " +
            "join l.client c " +
            "join l.uzrunvelyofas u " +
            "where f=:filial " +
            "and (l.createDate between :start and :end)" +
            "and l.isActive=true " +
            "and (l.status in (:statuses)) " +
            "and ( l.number  LIKE CONCAT('%',:search,'%') " +
            "or c.personalNumber LIKE CONCAT('%',:search,'%') " +
            "or u in (select u from u where u.number like CONCAT('%',:search,'%') )) " +
            "order by l.createDate desc")
    Page<Loan> findMyFilialLoansWithSearch(@Param("search") String search,
                                           @Param("filial") Filial filial, @Param("statuses") List<Integer> statuses,
                                           @Param("start") Date start,@Param("end") Date end, Pageable pageable);


    @Query(value = "select l from Loan l join l.client c where c.id=:id order by l.createDate desc")
    List<Loan> findClientLoans(@Param("id") long id);

    List<Loan> findByIsActiveAndClosedAndNextInterestCalculationDateBetween(boolean active, boolean closed, Date nextInterestCalculationDateStart, Date nextInterestCalculationDateEnd);


    @Query(value = "select l from Loan l where l.filial=:filial and (l.createDate between :fromD and :toD) order by l.createDate asc")
    List<Loan> findByCreateDateBetween(@Param("fromD") Date fromDate,
                                       @Param("toD")Date toDate,
                                       @Param("filial")Filial filial);




    @Query (value = "select * from loans where create_date>'2016-01-01 00:00:00'",nativeQuery = true)
    List<Loan> findByNumber();

    List<Loan> findByFilialAndIsActiveOrderByCreateDate(Filial filial, boolean active);


    @Query("select sum (l.loanSum) from Loan l where (l.createDate between :from and :to ) and l.filial=:filial and l.isActive=true")
    float loansToday(@Param("filial") Filial filial, @Param("from") Date time,@Param("to") Date time2);

    @Query("select l from Loan l " +
            "join l.loanInterests p " +
            "where " +
            "p in (select p from p where p.dueDate<:date) and " +
            "l.status = 1 and l.isActive=true")
    List<Loan> findOverdue(@Param("date") Date date);

    @Query("select distinct l from Loan l join l.loanInterests i where " +
            "l.filial=:filial and " +
            "l.isActive=true  and " +
            "l.status in :statuses and " +
            "i in (select i from i where i.payed=false and (i.dueDate between :fromD and :toD))")
    List<Loan> findTodayPay( @Param("fromD") Date from,@Param("toD")  Date to,
                             @Param("filial")Filial filial,
                             @Param("statuses") List<Integer> statuses);


    Page<Loan> findByClientAndIsActiveAndStatusInOrderByNextInterestCalculationDateAsc( Client client,  boolean isActive, List<Integer> statuses, Pageable pageable);
}
