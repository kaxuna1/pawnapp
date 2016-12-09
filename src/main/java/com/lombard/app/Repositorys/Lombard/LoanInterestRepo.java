package com.lombard.app.Repositorys.Lombard;

import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Client;
import com.lombard.app.models.Lombard.LoanInterest;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

/**
 * Created by kaxa on 11/24/16.
 */
public interface LoanInterestRepo extends JpaRepository<LoanInterest,Long> {

    @Query("select sum (li.sum) from LoanInterest li join li.loan l where (li.createDate between :from and :to ) and l.filial=:filial")
    Float interestsTodayMade(@Param("filial") Filial filial, @Param("from") Date time, @Param("to") Date time2);


    @Query("select sum (li.sum) from LoanInterest li join li.loan l where " +
            "(li.dueDate between :fromD and :toD ) and l.filial=:filial and l.isActive=true")
    Float interestsTodayPay(@Param("filial") Filial filial, @Param("fromD") Date time, @Param("toD") Date time2);


    @Query("select sum(li.sum) from LoanInterest li join li.loan l where " +
            "l.client = :client and l.isActive=true and li.active=true")
    Integer clientInterest(@Param("client") Client client);
}
