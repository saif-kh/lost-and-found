package com.example.findit.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import java.util.Date;

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonInclude(JsonInclude.Include.NON_NULL)
@DiscriminatorColumn(name = "post_type")
@Data
@NoArgsConstructor
@SuperBuilder
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Length(min = 3, max = 25, message = "title should be between 3 and 25 characters")
    private String title;

    @Length(max = 255, message = "description should be less than 255 characters")
    private String description;

    @NotNull(message = "category can't be empty")
    @Enumerated(value = EnumType.STRING)
    private Category category;

//    @NotEmpty(message = "date can't be empty")
    @PastOrPresent(message = "date can't be in the future")
    private Date date = new Date();

    private String picture_Path;

    @Column(columnDefinition = "boolean default false")
    private boolean archived;

    @ManyToOne
    private Person person;

}
