package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Lombard.Dictionary.MobileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 11/17/16.
 */

@Transactional
public interface MobileModelRepo extends JpaRepository<MobileModel,Long> {
}
