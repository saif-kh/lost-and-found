package com.example.findit.repositories;

import com.example.findit.models.Person;
import com.example.findit.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role,Long> {
    List<Role> findByPerson(Person person);
}
