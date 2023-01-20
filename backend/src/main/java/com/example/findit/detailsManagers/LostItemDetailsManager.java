package com.example.findit.detailsManagers;

import com.example.findit.models.LostItemPost;
import com.example.findit.repositories.LostItemPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LostItemDetailsManager extends PostDetailsManager<LostItemPost,LostItemPostRepository> {

    @Autowired
    public LostItemDetailsManager(LostItemPostRepository lostItem){
        super.postRepository = lostItem;
    }

}
