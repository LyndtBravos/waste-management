package com.enviro.assessment.inter001.brianmthembu.repository;

import com.enviro.assessment.inter001.brianmthembu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}