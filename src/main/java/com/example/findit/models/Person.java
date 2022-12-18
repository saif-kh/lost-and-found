package com.example.findit.models;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@DiscriminatorValue("person")
@Entity
public class Person extends AppUser{

    @OneToMany(mappedBy = "person")
    List<FoundItemPost> foundItemPosts;

    @OneToMany(mappedBy = "person")
    List<LostItemPost> lostItemPosts;
}
