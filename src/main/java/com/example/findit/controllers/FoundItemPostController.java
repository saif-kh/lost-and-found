package com.example.findit.controllers;

import com.example.findit.models.FoundItemPost;
import com.example.findit.repositories.FoundItemPostRepository;
import com.example.findit.services.FoundItemPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/found_item")
public class FoundItemPostController extends PostController<FoundItemPost, FoundItemPostRepository, FoundItemPostService> {

    @Autowired
    public FoundItemPostController(FoundItemPostService foundItemPostService) {
        super.postService = foundItemPostService;
    }

}
