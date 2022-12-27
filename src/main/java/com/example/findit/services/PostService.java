package com.example.findit.services;

import com.example.findit.detailsManagers.*;
import com.example.findit.dto.PostCreate;
import com.example.findit.models.*;
import com.example.findit.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public abstract class PostService<T extends Post, R extends GenericRepository<T>, P extends DetailsManager<T, R>> {

    PersonDetailsManager personDetailsManager;
    DetailsManager<T, R> postDetailsManager;
    GenericRepository<T> postRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private KeywordRepository keywordRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;


    //    @Autowired
//    public PostService(postDetailsManager<T,R> postDetailsManager, PersonDetailsManager personDetailsManager, GenericRepository<T> postRepository) {
//        this.postDetailsManager = postDetailsManager;
//        this.personDetailsManager = personDetailsManager;
//        this.postRepository = postRepository;
//    }
    public T addPost(PostCreate postObj, Authentication auth) {
        T post = buildPostDetails(postObj, auth);
        postDetailsManager.createPost(post);
        return post;
    }

    public T updatePost(PostCreate postObj, long id, Authentication auth) {
        Person person = getAuthenticated(auth);
        T post = postDetailsManager.getPostById(id);
        userEquality(person, post.getPerson());
        T newPost = buildPostDetails(postObj, auth);
        return postDetailsManager.updatePost(newPost, id);
    }

    public Page<T> getPostsByUsername(int pageNumber, Authentication auth) {
        Person person = getAuthenticated(auth);
        Page<T> page = postRepository.findByPerson(person, PageRequest.of(pageNumber, 5));
        page.getContent().forEach(post -> {
            post.setPerson(null);
        });
        return page;
    }

    public void deletePost(long id, Authentication auth) {
        Person person = getAuthenticated(auth);
        T post = postDetailsManager.getPostById(id);
        userEquality(person, post.getPerson());
        postDetailsManager.deletePost(id);
    }

    public void archivePost(long id, Authentication auth) {
        Person person = getAuthenticated(auth);
        T post = postDetailsManager.getPostById(id);
        userEquality(person, post.getPerson());
        postDetailsManager.archivePost(id);
    }

    public T getPostById(long id) {
        return postDetailsManager.getPostById(id);
    }

    public Page<T> getAllNoArchivedPosts(int pageNumber) {
        return postDetailsManager.getAllNoArchivedPosts(pageNumber);
    }

    public Page<T> filterPosts(FilterPost filterPost, String fieldName, int pageNumber) {
        return postRepository.findAll(new FilterPosts<T>(filterPost, fieldName), PageRequest.of(pageNumber, 4));
    }

    public void userEquality(Person p1, Person p2) {
        String username1 = p1.getEmail();
        String username2 = p2.getEmail();
        if (!username1.equals(username2)) {
            throw new IllegalArgumentException("machi ta3k had post aweld l9e7ba");
        }
    }

    public Person getAuthenticated(Authentication auth) {
        User user = (User) auth.getPrincipal();
        String username = user.getUsername();
        return personDetailsManager.getPersonByUsername(username);
    }

    public abstract T buildPost(PostCreate postObj);

    public T buildPostDetails(PostCreate postObj, Authentication auth) {
        Person person = getAuthenticated(auth);
        T post = buildPost(postObj);
        Category category = categoryRepository.findByTitle(postObj.getCategory());
        Neighborhood neighborhood = neighborhoodRepository.findByTitle(postObj.getNeighborhood());
        City city = cityRepository.findByTitle(postObj.getCity());
        List<Keyword> keywords = postObj.getKeywords().stream()
                .map(keyword -> {
                    return keywordRepository.findByTitle(keyword);
                })
                .collect(Collectors.toList());
        System.out.println(neighborhood);

        // affectation
        post.setPerson(person);
        post.setCity(city);
        post.setNeighborhood(neighborhood);
        post.setCategory(category);
        post.setKeywords(keywords);
        return post;
    }
}
