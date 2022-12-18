package com.example.findit.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@DiscriminatorColumn(name = "user_type")
@Data
@NoArgsConstructor
@SuperBuilder
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

    @Length(min = 13, max = 26, message = "password should be between 13 and 26 characters")
    private String password;

    @Column(columnDefinition = "boolean default false")
    private boolean archived;
}
