package com.lombard.app.Repositorys.Lombard;

import com.lombard.app.models.Lombard.Dictionary.Sinji;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by kaxa on 12/8/16.
 */
public interface SinjiRepo extends JpaRepository<Sinji,Long> {
    List<Sinji> findByIdIn(List<Long> sinjis);
}
