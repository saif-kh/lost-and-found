package com.example.findit.repositories;

import com.example.findit.models.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person,Long> {
    Page<Person> findByArchivedFalse(Pageable pageable);
    boolean existsByEmail(String email);
    Optional<Person> findByEmail(String email);
}
