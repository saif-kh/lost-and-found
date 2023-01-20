package com.example.findit.services;

import com.example.findit.detailsManagers.FoundItemDetailsManager;
import com.example.findit.detailsManagers.LostItemDetailsManager;
import com.example.findit.detailsManagers.PersonDetailsManager;
import com.example.findit.detailsManagers.PostDetailsManager;
import com.example.findit.dto.PostCreate;
import com.example.findit.mapper.ToPost;
import com.example.findit.models.LostItemPost;
import com.example.findit.repositories.LostItemPostRepository;
import com.example.findit.repositories.GenericRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LostItemService extends PostService<LostItemPost, LostItemPostRepository, LostItemDetailsManager>{

    @Autowired
    public LostItemService ( PostDetailsManager<LostItemPost, LostItemPostRepository> lostItemDetailsManager
                            ,PersonDetailsManager personDetailsManager
                            ,GenericRepository<LostItemPost> lostItemRepository
                            ) {
        this.postDetailsManager = lostItemDetailsManager ;
        this.personDetailsManager = personDetailsManager;
        this.postRepository = lostItemRepository;
    }

    @Override
    public LostItemPost buildPost(PostCreate postObj) {
        return ToPost.toLostItemPost(postObj);
    }
}
