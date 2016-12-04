package com.lombard.app.Repositorys.Lombard;


import com.lombard.app.models.Lombard.ItemClasses.MobilePhone;
import org.hibernate.annotations.Parameter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kaxa on 11/17/16.
 */
@Transactional
public interface MobilePhoneRepo extends JpaRepository<MobilePhone,Long> {

}
