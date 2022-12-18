package com.example.findit.models;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDate;

@DiscriminatorValue("LOST_ITEM")
@Entity
public class LostItemPost extends Post {

    @PastOrPresent(message = "date can't be in the future")
    private LocalDate dateLostIt;

    @ManyToOne
    Person person;
}