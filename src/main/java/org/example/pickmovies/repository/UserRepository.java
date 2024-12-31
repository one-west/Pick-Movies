package org.example.pickmovies.repository;

import java.util.Optional;
import org.example.pickmovies.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}