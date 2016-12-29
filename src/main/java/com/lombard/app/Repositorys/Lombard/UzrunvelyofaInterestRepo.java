package com.lombard.app.Repositorys.Lombard;

import com.lombard.app.models.Lombard.ItemClasses.UzrunvelyofaInterest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kakha on 12/21/2016.
 */
@Transactional
public interface UzrunvelyofaInterestRepo extends JpaRepository<UzrunvelyofaInterest,Long> {

}
