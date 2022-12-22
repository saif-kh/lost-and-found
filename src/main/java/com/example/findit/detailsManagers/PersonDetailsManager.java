package com.example.findit.detailsManagers;

import com.example.findit.models.Person;
import com.example.findit.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class PersonDetailsManager {

    private final PersonRepository personRepository;

    @Autowired
    public PersonDetailsManager(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person getUserById(long id) {
        Optional<Person> person = personRepository.findById(id);
        return person.orElseThrow(() -> {throw new UsernameNotFoundException("username");});
    }

    public Person getPersonByUsername(String username) {
        Optional<Person> person = personRepository.findByEmail(username);
        if(person.isEmpty()) throw new UsernameNotFoundException("username");
        return person.get();
    }

    public Person createUser(Person person) {
        return personRepository.save(person);
    }

    public Person updateUser(Person person, long id) {
        personRepository.findById(id)
                .ifPresentOrElse(
                        (personIsPresent) -> {
                            personIsPresent.setId(id);
                            personRepository.save(personIsPresent);
                        }
                        , () -> {
                            throw new IllegalStateException("");
                        }
                );

        return person;
    }

    public void deleteUser(long id) {
        personRepository.findById(id)
                .ifPresentOrElse(
                        (personIsPresent) -> {
                            personRepository.delete(personIsPresent);
                        }
                        , () -> {
                            throw new IllegalStateException("");
                        }
                );
    }

    public Page<Person> getAllNoArchivedUsers(int pageNumber){
        return personRepository.findByArchivedFalse(PageRequest.of(pageNumber, 5));
    }

    public void archiveUser(long id) {
        personRepository.findById(id)
                .ifPresentOrElse(
                        (personIsPresent) -> {
                            personIsPresent.setArchived(true);
                            personRepository.save(personIsPresent);
                        }
                        , () -> {
                            throw new IllegalStateException("");
                        }
                );
    }
}
