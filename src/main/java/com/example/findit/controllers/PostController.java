package com.example.findit.controllers;

import com.example.findit.models.Post;
import com.example.findit.repositories.PostRepository;
import com.example.findit.services.PostServices;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class PostController<T extends Post, R extends PostRepository<T>, S extends PostServices<T, R>> {

    S postService;

    @PostMapping(value = "/create")
    public T createFoundItemPost(@RequestBody T post) {
        return postService.createPost(post);
    }

    @GetMapping(value = "/get_post/{id}")
    public Optional<T> getPostById(@PathVariable long id) {
        return postService.getPostById(id);
    }

    @PostMapping(value = "/update_post/{id}")
    public T updatePost(@RequestBody @Valid T post,@PathVariable long id){
        return postService.updatePost(post,id);
    }

    @GetMapping(value = "/all_posts/{pageNumber}")
    public Page<T> getAllPosts(@PathVariable int pageNumber){
        return postService.getAllNoArchivedPosts(pageNumber);
    }

    @GetMapping(value = "/archive_post/{id}")
    public void archivePost(@PathVariable long id){
        postService.archivePost(id);
    }

    @GetMapping(value = "/delete_post/{id}")
    public void deletePost(@PathVariable long id){
        postService.deletePost(id);
    }
}
