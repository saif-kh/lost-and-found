package com.example.findit.mapper;

import com.example.findit.dto.PostCreate;
import com.example.findit.models.FoundItemPost;
import com.example.findit.models.LostItemPost;

import java.time.LocalDate;
import java.util.Date;

public class ToPost {
    public static FoundItemPost toFoundItemPost(PostCreate postObj) {
        return FoundItemPost.builder()
                .title(postObj.getTitle())
                .description(postObj.getDescription())
                .dateFindIt(LocalDate.parse(postObj.getDate()))
                .build();
    }
    public static LostItemPost toLostItemPost(PostCreate postObj) {
        return LostItemPost.builder()
                .title(postObj.getTitle())
                .description(postObj.getDescription())
                .dateLostIt(LocalDate.parse(postObj.getDate()))
                .date(new Date())
                .build();
    }
}