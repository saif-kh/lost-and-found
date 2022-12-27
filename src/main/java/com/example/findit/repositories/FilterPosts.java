package com.example.findit.repositories;

import com.example.findit.models.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@SuperBuilder
@Component
public class FilterPosts<T extends Post> implements Specification<T> {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private KeywordRepository keywordRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    private String dateStart;
    private String dateEnd;
    private String category;
    private String city;
    private String neighborhood;
    private String fieldName;
    private List<String> keywords;

    public FilterPosts(FilterPost filterPost , String fieldName) {
        this.dateStart = filterPost.getDateStart();
        this.dateEnd = filterPost.getDateEnd();
        this.category = filterPost.getCategory();
        this.city = filterPost.getCity();
        this.neighborhood = filterPost.getNeighborhood();
        this.fieldName = fieldName;
        this.keywords = filterPost.getKeywords();
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();
        List<Predicate> predicates2 = new ArrayList<>();
        if ( dateStart != null) {
            LocalDate dateS = LocalDate.parse(dateStart);
            System.out.println(dateS);
            Predicate predicate = cb.greaterThanOrEqualTo(root.get(fieldName),dateS);
            predicates.add(predicate);
        }
        if ( dateEnd != null) {
            LocalDate dateE = LocalDate.parse(dateEnd);
            System.out.println(dateE);
            Predicate predicate = cb.lessThanOrEqualTo(root.get(fieldName),dateE);
            predicates.add(predicate);
        }
        if ( category != null && !category.isEmpty()) {
            Predicate predicate = cb.equal(root.get("category").get("title"),category);
            predicates.add(predicate);
            if(keywords.size()!=0 ){
                keywords.forEach(keyword ->{
                    Predicate predicate2 = cb.equal(root.get("keywords").get("title"),keyword);
                    predicates2.add(predicate2);
                });
            }
        }
        if ( city != null && !city.isEmpty()) {
            Predicate predicate1 = cb.equal(root.get("city"),city);
            predicates.add(predicate1);
            if ( neighborhood != null && !neighborhood.isEmpty()) {
                Predicate predicate2 = cb.equal(root.get("neighborhood"),neighborhood);
                predicates.add(predicate2);
            }
        }
        Predicate[] predicatesArray = new Predicate[predicates.size()];
        Predicate[] predicatesArray2 = new Predicate[predicates2.size()];
        predicates.add(cb.or(predicates2.toArray(predicatesArray2)));
        return cb.and(predicates.toArray(predicatesArray));
    }
}