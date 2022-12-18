package com.example.findit.repositories;

import com.example.findit.models.FoundItemPost;
import com.example.findit.models.LostItemPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LostItemPostRepository extends PostRepository<LostItemPost> {
    Page<LostItemPost> findAll(Pageable pageable);
    Page<LostItemPost> findByArchivedFalse(Pageable pageable);
    String x = "hi";
}
