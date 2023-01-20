package com.example.findit.controllers;

import com.example.findit.dto.PostCreate;
import com.example.findit.models.City;
import com.example.findit.models.Neighborhood;
import com.example.findit.repositories.CityRepository;
import com.example.findit.repositories.NeighborhoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/city")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    @PostMapping(value = "/create_city")
    public City createCity(@RequestBody City city) {
        City c = City.builder().title(city.getTitle()).build();
        return cityRepository.save(c);
    }

    @PostMapping(value = "/create_neighborhood")
    public Neighborhood createNeighborhood(@RequestBody Neighborhood neighborhood) {
        City c = cityRepository.findById(neighborhood.getId()).get();
        Neighborhood n = Neighborhood.builder().title(neighborhood.getTitle()).build();
        n.setCity(c);
        return neighborhoodRepository.save(n);
    }

}
