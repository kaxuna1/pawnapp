package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 11/16/16.
 */
@Transactional
public interface ClientsRepo extends JpaRepository<Client, Long> {

    Page<Client> findByNameContainingOrSurnameContainingOrPersonalNumberContainingOrderByNameAsc(@Param("name") String name,
                                                                                                 @Param("surname") String surname,
                                                                                                 @Param("personalNumber") String personalNumber,
                                                                                                 Pageable pageable);
    @Query("select distinct c from Client c join c.loans l " +
            "where (l in (select l from l where l.isActive=true and l.status in :statuses and (l.client.id = c.id))) " +
            "and c.filial = :filial " +
            "and c.isActive = true " +
            "and (c.personalNumber LIKE CONCAT('%',:search,'%') " +
            "or c.name LIKE CONCAT('%',:search,'%') " +
            "or c.surname LIKE CONCAT('%',:search,'%') " +
            "or c.mobile LIKE CONCAT('%',:search,'%')) " +
            "group by (l.id)" +
            "order by count (l.id)")
    Page<Client> findByFlaged(@Param("search") String search,
                              @Param("statuses") List<Integer> statuses,
                              @Param("filial") Filial filial,
                              Pageable pageable);

    List<Client> findByPersonalNumberAndFilial(@Param("personalNumber") String personalNumber, @Param("filial") Filial filial);

    @Query("select count(l) from Loan l where l.client=:client")
    int getLoansNumber(@Param("client") Client client);
}

