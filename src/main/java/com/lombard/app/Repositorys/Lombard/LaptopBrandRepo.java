package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Lombard.Dictionary.LaptopBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 11/27/16.
 */
@Transactional
public interface LaptopBrandRepo extends JpaRepository<LaptopBrand,Long> {
    List<LaptopBrand> findByActive(@Param("active") boolean active);
}
