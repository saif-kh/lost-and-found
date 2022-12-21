package com.example.findit.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@DiscriminatorColumn(name = "user_type")
@Data
@NoArgsConstructor
@SuperBuilder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Length(min = 2, max = 25, message = "first name should be between 2 and 25 characters")
    private String firstName;

    @Length(min = 2, max = 25, message = "last name should be between 2 and 25 characters")
    private String lastName;

    @NotEmpty
    @Email
    @Column(unique = true)
    private String email;

    @Length(min = 3, max = 26, message = "password should be between 13 and 26 characters")
    private String password;

    @Column(columnDefinition = "boolean default false")
    private boolean archived;

    @OneToMany(mappedBy = "person")
    private List<Role> roles = new ArrayList<>();
}
