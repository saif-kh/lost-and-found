package com.example.findit.controllers;

import com.example.findit.models.LostItemPost;
import com.example.findit.repositories.LostItemPostRepository;
import com.example.findit.services.LostItemPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/lost_item")
public class LostItemPostController extends PostController<LostItemPost, LostItemPostRepository, LostItemPostService> {

    @Autowired
    public LostItemPostController(LostItemPostService lostItemPostService){
        super.postService = lostItemPostService;
    }


}
