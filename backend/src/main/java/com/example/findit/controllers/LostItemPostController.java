package com.example.findit.controllers;

import com.example.findit.models.LostItemPost;
import com.example.findit.repositories.LostItemPostRepository;
import com.example.findit.detailsManagers.LostItemDetailsManager;
import com.example.findit.services.LostItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/lost_item")
public class LostItemPostController extends PostController<LostItemPost, LostItemPostRepository, LostItemDetailsManager, LostItemService> {

    @Autowired
    public LostItemPostController(LostItemService lostItemPostService){
        super.postService = lostItemPostService;
    }


}
