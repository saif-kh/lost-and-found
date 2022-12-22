package com.example.findit.services;

import com.example.findit.detailsManagers.DetailsManager;
import com.example.findit.detailsManagers.FoundItemDetailsManager;
import com.example.findit.detailsManagers.PersonDetailsManager;
import com.example.findit.detailsManagers.PostDetailsManager;
import com.example.findit.models.FoundItemPost;
import com.example.findit.models.Person;
import com.example.findit.models.Post;
import com.example.findit.repositories.FoundItemPostRepository;
import com.example.findit.repositories.GenericRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class PostService<T extends Post , R extends GenericRepository<T> , P extends DetailsManager<T,R>> {

    PersonDetailsManager personDetailsManager;
    DetailsManager<T,R> postDetailsManager;
    GenericRepository<T> postRepository;

    @Autowired
    FoundItemPostRepository f;

//    @Autowired
//    public PostService(postDetailsManager<T,R> postDetailsManager, PersonDetailsManager personDetailsManager, GenericRepository<T> postRepository) {
//        this.postDetailsManager = postDetailsManager;
//        this.personDetailsManager = personDetailsManager;
//        this.postRepository = postRepository;
//    }
    public T addPost(T postObj, Authentication auth) {
        User user = (User) auth.getPrincipal();
        String username = user.getUsername();
        Person person = personDetailsManager.getPersonByUsername(username);
        postObj.setPerson(person);
        postDetailsManager.createPost(postObj);
        return postObj;
    }

    public T updatePost(T postObj, long id, Authentication auth) {
        User user = (User) auth.getPrincipal();
        String username = user.getUsername();
        Person person = personDetailsManager.getPersonByUsername(username);
        T post = postDetailsManager.getPostById(id);
        userEquality(person,post.getPerson());
        postObj.setPerson(person);
        return postDetailsManager.updatePost(postObj, id);
    }

    public Page<T> getPostsByUsername(int pageNumber, Authentication auth) {
        User user = (User) auth.getPrincipal();
        String username = user.getUsername();
        Person person = personDetailsManager.getPersonByUsername(username);
        Page<T> page = postRepository.findByPerson(person, PageRequest.of(pageNumber, 5));
        page.getContent().forEach(post -> {post.setPerson(null);});
        return page;
    }

    public void deletePost(long id, Authentication auth) {
        User user = (User) auth.getPrincipal();
        String username = user.getUsername();
        Person person = personDetailsManager.getPersonByUsername(username);
        T post = postDetailsManager.getPostById(id);
        userEquality(person,post.getPerson());
        postDetailsManager.deletePost(id);
    }

    public void archivePost(long id, Authentication auth) {
        User user = (User) auth.getPrincipal();
        String username = user.getUsername();
        Person person = personDetailsManager.getPersonByUsername(username);
        T post = postDetailsManager.getPostById(id);
        userEquality(person,post.getPerson());
        postDetailsManager.archivePost(id);
    }

    public T getPostById(long id) {
        return postDetailsManager.getPostById(id);
    }

    public Page<T> getAllNoArchivedPosts(int pageNumber) {
        return postDetailsManager.getAllNoArchivedPosts(pageNumber);
    }

    public void userEquality(Person p1 , Person p2){
        String username1 = p1.getEmail();
        String username2 = p2.getEmail();
        if(!username1.equals(username2)){
            throw new IllegalArgumentException("machi ta3k had post aweld l9e7ba");
        }
    }

}
