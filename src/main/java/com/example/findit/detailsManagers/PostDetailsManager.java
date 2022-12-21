package com.example.findit.detailsManagers;

import com.example.findit.models.FoundItemPost;
import com.example.findit.models.Person;
import com.example.findit.models.Post;
import com.example.findit.repositories.GenericRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public abstract class PostDetailsManager<T extends Post , R extends GenericRepository<T>> implements DetailsManager<T,R>{

    R postRepository;

    public T getPostById(long id) {
        Optional<T> post = postRepository.findById(id);
        return post.orElseThrow(() -> {throw new UsernameNotFoundException("username");});
    }

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
}
