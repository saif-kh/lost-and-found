package com.example.findit.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@SuperBuilder
public class EmailMessage {
    private int to;
    private String body;
}
