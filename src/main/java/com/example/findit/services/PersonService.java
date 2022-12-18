package com.example.findit.services;

import com.example.findit.models.Person;
import com.example.findit.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class PersonService {

    private PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }
    public Person createPerson(Person person) {
        return personRepository.save(person);
    }

    public Person updatePerson(Person person, long id) {
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

    public Optional<Person> getPersonById(long id) {
        return personRepository.existsById(id) ? personRepository.findById(id) : Optional.empty();
    }

    public Page<Person> getAllNoArchivedPersons(int pageNumber){
        return personRepository.findByArchivedFalse(PageRequest.of(pageNumber, 5));
    }

    public void archivePerson(long id) {
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

    public void deletePerson(long id) {
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
}
