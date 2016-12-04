package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Loan;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
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
            "and l.closed=:closed and l.isActive=true order by l.createDate desc")
    Page<Loan> findMyFilialLoans(@Param("filial") Filial filial, @Param("closed") boolean closed, Pageable pageable);

    @Query(value = "select l from Loan l " +
            "join l.filial f " +
            "join l.client c " +
            "join l.uzrunvelyofas u " +
            "where f=:filial " +
            "and l.isActive=true " +
            "and l.closed=:closed " +
            "and ( l.number  LIKE CONCAT('%',:search,'%') " +
            "or c.personalNumber LIKE CONCAT('%',:search,'%') " +
            "or u in (select u from u where u.number like CONCAT('%',:search,'%') )) " +
            "order by l.createDate desc")
    Page<Loan> findMyFilialLoansWithSearch(@Param("search") String search,
                                           @Param("filial") Filial filial, @Param("closed") boolean closed, Pageable pageable);


    @Query(value = "select l from Loan l join l.client c where c.id=:id order by l.createDate desc")
    List<Loan> findClientLoans(@Param("id") long id);

    List<Loan> findByIsActiveAndClosedAndNextInterestCalculationDateBetween(boolean active, boolean closed, Date nextInterestCalculationDateStart, Date nextInterestCalculationDateEnd);

    @NotNull
    @Query(value = "select l from Loan l where l.filial=:filial and (l.createDate between :fromD and :toD) order by l.createDate asc")
    List<Loan> findByCreateDateBetween(@Param("fromD") Date fromDate,
                                       @Param("toD")Date toDate,
                                       @Param("filial")Filial filial);



    @NotNull
    @Query (value = "select * from loans where create_date>'2016-01-01 00:00:00'",nativeQuery = true)
    List<Loan> findByNumber();

    List<Loan> findByFilialAndIsActiveOrderByCreateDate(Filial filial, boolean active);

    @NotNull
    @Query("select sum (l.loanSum) from Loan l where (l.createDate between :from and :to ) and l.filial=:filial")
    float loansToday(@Param("filial") Filial filial, @Param("from") Date time,@Param("to") Date time2);
}
