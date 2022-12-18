package com.example.findit.repositories;

import com.example.findit.models.FoundItemPost;
import com.example.findit.models.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FoundItemPostRepository extends PostRepository<FoundItemPost> {
    Page<FoundItemPost> findAll(Pageable pageable);
    Page<FoundItemPost> findByArchivedFalse(Pageable pageable);
}
