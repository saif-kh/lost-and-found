package com.example.findit.services;

import com.example.findit.models.FoundItemPost;
import com.example.findit.models.LostItemPost;
import com.example.findit.models.Post;
import com.example.findit.repositories.FoundItemPostRepository;
import com.example.findit.repositories.LostItemPostRepository;
import com.example.findit.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public abstract class PostServices<T extends Post, R extends PostRepository<T>> {

    R postRepository;

    public T createPost(T post) {
        return postRepository.save(post);
    }

    public T updatePost(T post, long id) {
        postRepository.findById(id)
                .ifPresentOrElse(
                        (postIsPresent) -> {
                            postIsPresent.setId(id);
                            postRepository.save(postIsPresent);
                        }
                        , () -> {
                            throw new IllegalStateException("");
                        }
                );

        return post;
    }

    public Optional<T> getPostById(long id) {
        return postRepository.existsById(id) ? postRepository.findById(id) : Optional.empty();
    }

    public Page<T> getAllNoArchivedPosts(int pageNumber){
        return postRepository.findByArchivedFalse(PageRequest.of(pageNumber, 5));
    }

    public void archivePost(long id) {
        postRepository.findById(id)
                .ifPresentOrElse(
                        (postIsPresent) -> {
                            postIsPresent.setArchived(true);
                            postRepository.save(postIsPresent);
                        }
                        , () -> {
                            throw new IllegalStateException("");
                        }
                );
    }

    public void deletePost(long id) {
        postRepository.findById(id)
                .ifPresentOrElse(
                        (postIsPresent) -> {
                            postRepository.delete(postIsPresent);
                        }
                        , () -> {
                            throw new IllegalStateException("");
                        }
                );
    }
}
