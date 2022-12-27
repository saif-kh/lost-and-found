package com.example.findit.repositories;

import com.example.findit.models.City;
import com.example.findit.models.Keyword;
import com.example.findit.models.Neighborhood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City,Long> {
    City findByTitle(String city);
    City findByNeighborhoodsContaining(Neighborhood neighborhood);
}