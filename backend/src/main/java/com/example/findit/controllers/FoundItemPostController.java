package com.example.findit.controllers;

import com.example.findit.models.FilterPost;
import com.example.findit.models.FoundItemPost;
import com.example.findit.repositories.FoundItemPostRepository;
import com.example.findit.detailsManagers.FoundItemDetailsManager;
import com.example.findit.services.FoundItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/found_item")
public class FoundItemPostController extends PostController<FoundItemPost, FoundItemPostRepository, FoundItemDetailsManager, FoundItemService> {

    @Autowired
    public FoundItemPostController(FoundItemService foundItemPostService) {
        this.postService = foundItemPostService;
    }

}
