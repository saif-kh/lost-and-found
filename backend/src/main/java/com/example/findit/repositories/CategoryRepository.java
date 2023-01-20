package com.example.findit.repositories;

import com.example.findit.models.Category;
import com.example.findit.models.Person;
import com.example.findit.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByTitle(String category);
}
