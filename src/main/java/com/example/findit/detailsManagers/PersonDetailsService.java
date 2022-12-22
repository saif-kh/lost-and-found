package com.example.findit.detailsManagers;

import com.example.findit.models.Person;
import com.example.findit.repositories.PersonRepository;
import com.example.findit.repositories.RoleRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PersonDetailsService implements UserDetailsService {

    private final PersonDetailsManager personDetailsManager;

    @Autowired
    PersonDetailsService(PersonDetailsManager personDetailsManager){
        this.personDetailsManager = personDetailsManager;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username); /// remove it later
        Person person = personDetailsManager.getPersonByUsername(username);
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
//        SimpleGrantedAuthority s = new SimpleGrantedAuthority();
//        grantedAuthorities.add(s);
//        System.out.println(grantedAuthorities); // remove it later
//        System.out.println("//////////////////////////////////////////////////////////////////////////////"); /// remove it later
//        Hibernate.initialize(person.getRoles());
        person.getRoles().forEach(role->{
            SimpleGrantedAuthority s = new SimpleGrantedAuthority(role.getRole());
            grantedAuthorities.add(s);
        });
        return new User(person.getEmail(), person.getPassword(), grantedAuthorities);
    }
}
