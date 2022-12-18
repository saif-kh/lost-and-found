package com.example.findit.services;

import com.example.findit.models.FoundItemPost;
import com.example.findit.models.LostItemPost;
import com.example.findit.models.Post;
import com.example.findit.repositories.LostItemPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Consumer;

@Service
public class LostItemPostService extends PostServices<LostItemPost,LostItemPostRepository> {

    @Autowired
    public LostItemPostService(LostItemPostRepository lostItem){
        super.postRepository = lostItem;
    }

}
