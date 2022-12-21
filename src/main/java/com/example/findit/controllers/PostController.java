package com.example.findit.controllers;

import com.example.findit.detailsManagers.DetailsManager;
import com.example.findit.models.Post;
import com.example.findit.repositories.GenericRepository;
import com.example.findit.detailsManagers.PostDetailsManager;
import com.example.findit.services.PostService;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Optional;

@RestController
public class PostController<T extends Post, R extends GenericRepository<T>,M extends DetailsManager<T,R>, S extends PostService<T, R, M>> {

    S postService;

    @PostMapping(value = "/create")
    public T createFoundItemPost(@RequestBody T post, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return postService.addPost(post, user);
    }

    @GetMapping(value = "/get_post/{id}")
    public T getPostById(@PathVariable long id) {
        return postService.getPostById(id);
    }

    @PostMapping(value = "/update_post/{id}")
    public T updatePost(@RequestBody @Valid T post, @PathVariable long id, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        return postService.updatePost(post,id,user);
    }

    @GetMapping(value = "/all_posts/{pageNumber}")
    public Page<T> getAllPosts(@PathVariable int pageNumber){
        return postService.getAllNoArchivedPosts(pageNumber);
    }

    @GetMapping(value = "/archive_post/{id}")
    public void archivePost(@PathVariable long id, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        postService.archivePost(id,user);
    }

    @GetMapping(value = "/delete_post/{id}")
    public void deletePost(@PathVariable long id, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        postService.deletePost(id,user);
    }

    @GetMapping(value = "/all_My_posts/{pageNumber}")
    public Page<T> getAllMyPosts(@PathVariable int pageNumber, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        return postService.getPostsByUsername(pageNumber, user);
    }
}
