package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Lombard.ItemClasses.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 11/27/16.
 */
@Transactional
public interface LaptopRepo extends JpaRepository<Laptop,Long> {
}
