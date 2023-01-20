package com.example.findit.models;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDate;

@DiscriminatorValue("FOUND_ITEM")
@Entity
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class FoundItemPost extends Post {

    @PastOrPresent(message = "date can't be in the future")
    private LocalDate dateFindIt;

}

