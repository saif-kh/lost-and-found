package com.example.findit.repositories;

import com.example.findit.models.FoundItemPost;
import com.example.findit.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PostRepository<T extends Post> extends JpaRepository<T,Long> {
    Page<T> findAll(Pageable pageable);
    Page<T> findByArchivedFalse(Pageable pageable);
}
