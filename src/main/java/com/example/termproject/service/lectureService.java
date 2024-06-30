package com.example.termproject.service;

import com.example.termproject.model.lectureEntity;
import com.example.termproject.repository.lectureRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class lectureService {
    @Autowired
    private lectureRepository repository;

    // lecture 추가
    public List<lectureEntity> create(final lectureEntity entity) {
        validate(entity);

        repository.save(entity);

        log.info("Entity Student Id: {} is saved", entity.getId());

        return repository.findByUserId(entity.getUserId());
    }

    public List<lectureEntity> retrieve(final String userId) {
        return repository.findByUserId(userId);
    }

    public List<lectureEntity> update(final lectureEntity entity) {
        validate(entity);

        final Optional<lectureEntity> original = repository.findById(entity.getId());

        original.ifPresent( lecture -> {
            lecture.setLecture(entity.getLecture());
            lecture.setProfessor(entity.getProfessor());
            lecture.setUniversity(entity.getUniversity());
            lecture.setStudentName(entity.getStudentName());

            repository.save(lecture);
        });

        return retrieve(entity.getUserId());
    }

    public List<lectureEntity> delete(final lectureEntity entity) {
        validate(entity);

        try {
            repository.delete(entity);
        } catch(Exception e) {
            log.error("error deleting entity ", entity.getId(), e);

            throw new RuntimeException("error deleting entity " + entity.getId());
        }
        return retrieve(entity.getUserId());
    }

    private void validate(final lectureEntity entity) {
        if (entity == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }

        if(entity.getUserId() == null) {
            log.warn("Unknown user.");
            throw new RuntimeException("Unknown user.");
        }
    }
}
