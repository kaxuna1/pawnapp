package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Lombard.Loan;
import com.lombard.app.models.Lombard.MovementModels.LoanMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 11/23/16.
 */
@Transactional
public interface LoanMovementsRepo extends JpaRepository<LoanMovement,Long> {
    List<LoanMovement> findByLoan(@Param("loan") Loan loan);
}
