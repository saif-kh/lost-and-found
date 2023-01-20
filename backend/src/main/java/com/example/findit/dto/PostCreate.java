package com.example.findit.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@SuperBuilder
public class PostCreate {
    @Length(min = 3, max = 25, message = "title should be between 3 and 25 characters")
    private String title;

    @Length(max = 255, message = "description should be less than 255 characters")
    private String description;

    @NotEmpty(message = "category can't be empty")
    private String category;

//    @NotNull(message = "category can't be empty")
    private List<String> keywords;

    @NotEmpty(message = "city can't be empty")
    private String city;

    @NotEmpty(message = "neighborhood can't be empty")
    private String neighborhood;

    @NotEmpty(message = "date can't be empty")
    private String date;
}
