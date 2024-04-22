package com.example.termproject.dto;

import com.example.termproject.model.bookEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class bookDTO {
    private String id;
    private String userId;
    private String title;
    private String author;
    private String publisher;

    public bookDTO(final bookEntity entity) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.publisher = entity.getPublisher();
    }

    public static bookEntity toEntity(final bookDTO dto) {
        return bookEntity.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .publisher(dto.getPublisher())
                .build();
    }
}
