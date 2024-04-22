package com.example.termproject.controller;

import com.example.termproject.dto.ResponseDTO;
import com.example.termproject.dto.bookDTO;
import com.example.termproject.model.bookEntity;
import com.example.termproject.service.bookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("book")
public class bookController {
    @Autowired
    private bookService service;

    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody bookDTO dto) {
        try {
            String temporaryUserId = "JiyoungJeong";

            bookEntity entity = bookDTO.toEntity(dto);

            entity.setId(null);

            entity.setUserId(temporaryUserId);

            List<bookEntity> entities = service.create(entity);

            List<bookDTO> dtos = entities.stream().map(bookDTO::new).collect(Collectors.toList());

            ResponseDTO<bookDTO> response = ResponseDTO.<bookDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<bookDTO> response = ResponseDTO.<bookDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveTodoList() {
        String temporaryUserId = "JiyoungJeong";

        List<bookEntity> entities= service.retrieve(temporaryUserId);

        List<bookDTO> dtos = entities.stream().map(bookDTO::new).collect(Collectors.toList());

        ResponseDTO<bookDTO> response = ResponseDTO.<bookDTO>builder().data(dtos).build();

        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateTodo(@RequestBody bookDTO dto) {
        String temporaryUserId = "JiyoungJeong";

        bookEntity entity = bookDTO.toEntity(dto);

        entity.setUserId(temporaryUserId);

        List<bookEntity> entities = service.update(entity);

        List<bookDTO> dtos = entities.stream().map(bookDTO::new).collect(Collectors.toList());

        ResponseDTO<bookDTO> response = ResponseDTO.<bookDTO>builder().data(dtos).build();

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@RequestBody bookDTO dto) {
        try {
            String temporaryUserId = "JiyoungJeong";

            bookEntity entity = bookDTO.toEntity(dto);

            entity.setUserId(temporaryUserId);

            List<bookEntity> entities = service.delete(entity);

            List<bookDTO> dtos = entities.stream().map(bookDTO::new).collect(Collectors.toList());

            ResponseDTO<bookDTO> response = ResponseDTO.<bookDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<bookDTO> response = ResponseDTO.<bookDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
