package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Lombard.Dictionary.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 11/29/16.
 */
@Transactional
public interface BrandRepo extends JpaRepository<Brand,Long> {
    List<Brand> findByTypeOrType(@Param("type") int type, @Param("type1") int i);
}
