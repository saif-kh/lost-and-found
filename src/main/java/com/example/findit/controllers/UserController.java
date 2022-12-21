package com.example.findit.controllers;

import com.example.findit.detailsManagers.PersonDetailsManager;
import com.example.findit.models.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    PersonDetailsManager personDetailsManager;

    @PostMapping(value = "/create")
    public Person createUser(@RequestBody @Valid Person person) {
        return personDetailsManager.createUser(person);
    }

    @GetMapping(value = "/get_user/{id}")
    public Person getUser(@PathVariable long id){
        return personDetailsManager.getUserById(id);
    }

    @GetMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @PostMapping(value = "/say_hi")
    public String sayHi(@RequestBody @Valid Person person){
        return person.toString();
    }
}
