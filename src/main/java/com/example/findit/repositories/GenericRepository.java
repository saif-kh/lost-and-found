package com.example.findit.repositories;

import com.example.findit.models.Person;
import com.example.findit.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenericRepository<T extends Post> extends JpaRepository<T,Long> {
    Page<T> findAll(Pageable pageable);
    Page<T> findByArchivedFalse(Pageable pageable);
    Page<T> findByPerson(Person person, Pageable pageable);
}
