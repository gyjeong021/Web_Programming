package com.example.termproject.controller;

import com.example.termproject.dto.ResponseDTO;
import com.example.termproject.dto.lectureDTO;

import com.example.termproject.model.lectureEntity;
import com.example.termproject.service.lectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("lecture")
public class lectureController {
    @Autowired
    private lectureService service;

    @PostMapping
    public ResponseEntity<?> createLecture(@AuthenticationPrincipal String userId,
                                           @RequestBody lectureDTO dto) {
        try {
            lectureEntity entity = lectureDTO.toEntity(dto);

            entity.setId(null);

            entity.setUserId(userId);

            List<lectureEntity> entities = service.create(entity);

            List<lectureDTO> dtos = entities.stream().map(lectureDTO::new).collect(Collectors.toList());

            ResponseDTO<lectureDTO> response = ResponseDTO.<lectureDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<lectureDTO> response = ResponseDTO.<lectureDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveLectureList(@AuthenticationPrincipal String userId) {
        List<lectureEntity> entities= service.retrieve(userId);

        List<lectureDTO> dtos = entities.stream().map(lectureDTO::new).collect(Collectors.toList());

        ResponseDTO<lectureDTO> response = ResponseDTO.<lectureDTO>builder().data(dtos).build();

        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateLecture(@AuthenticationPrincipal String userId,
                                           @RequestBody lectureDTO dto) {
        lectureEntity entity = lectureDTO.toEntity(dto);

        entity.setUserId(userId);

        List<lectureEntity> entities = service.update(entity);

        List<lectureDTO> dtos = entities.stream().map(lectureDTO::new).collect(Collectors.toList());

        ResponseDTO<lectureDTO> response = ResponseDTO.<lectureDTO>builder().data(dtos).build();

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteLecture(@AuthenticationPrincipal String userId,
                                           @RequestBody lectureDTO dto) {
        try {
            lectureEntity entity = lectureDTO.toEntity(dto);
            entity.setUserId(userId);
            List<lectureEntity> entities = service.delete(entity);
            List<lectureDTO> dtos = entities.stream().map(lectureDTO::new).collect(Collectors.toList());
            ResponseDTO<lectureDTO> response = ResponseDTO.<lectureDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<lectureDTO> response = ResponseDTO.<lectureDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
