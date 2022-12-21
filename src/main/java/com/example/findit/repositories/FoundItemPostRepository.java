package com.example.findit.repositories;

import com.example.findit.models.FoundItemPost;
import com.example.findit.models.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface FoundItemPostRepository extends GenericRepository<FoundItemPost> {
    Page<FoundItemPost> findByPerson(Person person, Pageable pageable);
}
