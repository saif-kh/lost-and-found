package com.example.findit.detailsManagers;

import com.example.findit.models.Post;
import com.example.findit.repositories.GenericRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface DetailsManager<T extends Post, R extends GenericRepository<T>> {

     T getPostById(long id);

     T createPost(T post);

     T updatePost(T post, long id);

     void deletePost(long id);

     Page<T> getAllNoArchivedPosts(int pageNumber);

     void archivePost(long id);
}
