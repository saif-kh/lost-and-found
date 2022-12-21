package com.example.findit.repositories;

import com.example.findit.models.FoundItemPost;
import com.example.findit.models.LostItemPost;
import com.example.findit.models.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface LostItemPostRepository extends GenericRepository<LostItemPost> {
    Page<LostItemPost> findByPerson(Person person, Pageable pageable);
}
