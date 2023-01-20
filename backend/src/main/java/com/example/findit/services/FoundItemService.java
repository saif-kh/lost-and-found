package com.example.findit.services;

import com.example.findit.detailsManagers.DetailsManager;
import com.example.findit.detailsManagers.FoundItemDetailsManager;
import com.example.findit.detailsManagers.PersonDetailsManager;
import com.example.findit.detailsManagers.PostDetailsManager;
import com.example.findit.dto.PostCreate;
import com.example.findit.mapper.ToPost;
import com.example.findit.models.FilterPost;
import com.example.findit.models.FoundItemPost;
import com.example.findit.repositories.FilterPosts;
import com.example.findit.repositories.FoundItemPostRepository;
import com.example.findit.repositories.GenericRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class FoundItemService extends PostService<FoundItemPost, FoundItemPostRepository,FoundItemDetailsManager>{

    @Autowired
    public FoundItemService( PersonDetailsManager personDetailsManager
                            ,DetailsManager<FoundItemPost,FoundItemPostRepository> foundItemDetailsManager
                            ,GenericRepository<FoundItemPost> foundItemRepository
                            ) {
        this.personDetailsManager = personDetailsManager;
        this.postDetailsManager = foundItemDetailsManager;
        this.postRepository = foundItemRepository;
    }

    @Override
    public FoundItemPost buildPost(PostCreate postObj) {
        return ToPost.toFoundItemPost(postObj);
    }
}
