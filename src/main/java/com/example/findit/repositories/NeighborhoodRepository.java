package com.example.findit.repositories;

import com.example.findit.models.City;
import com.example.findit.models.Neighborhood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NeighborhoodRepository extends JpaRepository<Neighborhood,Long> {
    Neighborhood findByTitle(String neighborhood);
}
