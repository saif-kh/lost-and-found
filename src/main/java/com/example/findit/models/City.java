package com.example.findit.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@SuperBuilder
@Entity
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String title;

    @OneToMany(mappedBy = "title")
    private List<Neighborhood> neighborhood;

    @OneToMany(mappedBy = "city")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Post> post;
}
