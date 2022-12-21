package com.example.findit.detailsManagers;

import com.example.findit.models.FoundItemPost;
import com.example.findit.repositories.FoundItemPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoundItemDetailsManager extends PostDetailsManager<FoundItemPost,FoundItemPostRepository> {

    @Autowired
    public FoundItemDetailsManager(FoundItemPostRepository lostItem){
        super.postRepository = lostItem;
    }

}