package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Client;
import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.LoanPayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 11/23/16.
 */
@Transactional
public interface LoanPaymentRepo extends JpaRepository<LoanPayment, Long> {
    List<LoanPayment> findByLoanAndActive(@Param("loan") Loan loan, @Param("active") boolean active);


    @Query("select lp from  LoanPayment lp join lp.loan l where l.filial = :filial")
    Page<LoanPayment> findFilialPayments(@Param("filial") Filial filial, Pageable pageable);

    @Query("select sum (li.sum) from LoanPayment li join li.loan l where (li.createDate between :from and :to ) " +
            "and l.filial=:filial and l.isActive=true and li.active=true")
    Float payedToday(@Param("filial") Filial filial, @Param("from") Date time, @Param("to") Date time2);


    @Query("select u from LoanPayment u join u.loan l where " +
            "l in (select l from l where l.isActive=true and l.client=:client) and u.active=true order by l.createDate desc ")
    Page<LoanPayment> findClientPayments(@Param("client") Client client, Pageable constructPageSpecification);

    @Query("select sum (p.sum) from LoanPayment p join p.loan l where " +
            "l.client=:client and l.isActive=true and p.active=true")
    Integer clientPayments(@Param("client") Client client);

    @Query(value = "select sum(lp.sum) from LoanPayment lp where lp.loan=:loan and lp.active=true")
    Float findLoanPaymentSum(@Param("loan") Loan loan);
}
