package com.example.findit.services;

import com.example.findit.models.FoundItemPost;
import com.example.findit.models.LostItemPost;
import com.example.findit.models.Post;
import com.example.findit.repositories.FoundItemPostRepository;
import com.example.findit.repositories.LostItemPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class FoundItemPostService extends PostServices<FoundItemPost,FoundItemPostRepository> {

    @Autowired
    public FoundItemPostService(FoundItemPostRepository lostItem){
        super.postRepository = lostItem;
    }

}