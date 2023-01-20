package com.example.findit.repositories;

import com.example.findit.models.Category;
import com.example.findit.models.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KeywordRepository extends JpaRepository<Keyword,Long> {
    Keyword findByTitle(String keyword);
}
