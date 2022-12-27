package com.example.findit.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import java.util.Date;
import java.util.List;

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonInclude(JsonInclude.Include.NON_NULL)
@DiscriminatorColumn(name = "post_type")
@Getter
@Setter
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
    @ManyToOne
    private Category category;

//    @NotEmpty(message = "date can't be empty")
    @Column(updatable = false)
    @PastOrPresent(message = "date can't be in the future")
    private Date date ;

    private String picture_Path;

    @Column(columnDefinition = "boolean default false")
    private boolean archived;

    @ManyToOne
    private Person person;

    @ManyToOne
    private City city;

    @ManyToMany
    @JoinTable(
            name = "post_keyword",
            joinColumns = @JoinColumn(name = "post_id",
                    referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id",
                    referencedColumnName = "id")
    )
    List<Keyword> keywords;

    @ManyToOne
    private Neighborhood neighborhood;

    @OneToMany(mappedBy = "post")
    List<Notification> notifications;

}
