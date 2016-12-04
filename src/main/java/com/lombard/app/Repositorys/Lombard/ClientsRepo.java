package com.lombard.app.Repositorys.Lombard;



import com.lombard.app.models.Filial;
import com.lombard.app.models.Lombard.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 11/16/16.
 */
@Transactional
public interface ClientsRepo extends JpaRepository<Client,Long> {

    Page<Client> findByNameContainingOrSurnameContainingOrPersonalNumberContainingOrderByNameAsc(@Param("name") String name,
                                                                                                 @Param("surname") String surname,
                                                                                                 @Param("personalNumber") String personalNumber,
                                                                                                 Pageable pageable);

    List<Client> findByPersonalNumberAndFilial(@Param("personalNumber") String personalNumber, @Param("filial") Filial filial);
}

