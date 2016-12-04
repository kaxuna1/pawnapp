package com.lombard.app.Repositorys;

import com.lombard.app.models.UserManagement.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by KGelashvili on 10/26/2015.
 */
@Transactional
public interface SessionRepository extends JpaRepository<Session, Long> {
}
