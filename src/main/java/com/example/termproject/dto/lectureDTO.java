package com.example.termproject.dto;

import com.example.termproject.model.lectureEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class lectureDTO {
    private String id;
    private String studentName;
    private String lecture;
    private String professor;
    private String university;

    public lectureDTO(final lectureEntity entity) {
        this.id = entity.getId();
        this.studentName = entity.getStudentName();
        this.lecture = entity.getLecture();
        this.professor = entity.getProfessor();
        this.university = entity.getUniversity();
    }

    public static lectureEntity toEntity(final lectureDTO dto) {
        return lectureEntity.builder()
                .id(dto.getId())
                .studentName(dto.getStudentName())
                .lecture(dto.getLecture())
                .professor(dto.getProfessor())
                .university(dto.getUniversity())
                .build();
    }
}
