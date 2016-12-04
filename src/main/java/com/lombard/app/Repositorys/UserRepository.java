package com.lombard.app.Repositorys;


import com.lombard.app.models.UserManagement.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
	@Query("SELECT u FROM User u WHERE u.username LIKE CONCAT('%',:username,'%') OR u.email LIKE CONCAT('%',:email,'%') OR u.address LIKE CONCAT('%',:address,'%')")
	Page<User> findByUsernameOrEmailOrAddress(@Param("username") String username, @Param("email") String email, @Param("address") String address, Pageable pageable);

	@Query("SELECT u FROM User u")
	List<User> findByMostWon();

	List<User> findByType(@Param("type") int type);

	@Query(value = "SELECT u.* FROM users u where u.user_id not in (SELECT val2 FROM project_to_prarab where val1=:id) AND type=3",
			nativeQuery = true)
	List<User> findByTypeAndIdNotIn(@Param("id") long id);
}
