package com.example.termproject.service;

import com.example.termproject.model.bookEntity;
import com.example.termproject.repository.bookRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class bookService {
    @Autowired
    private bookRepository repository;

    // book 아이템 추가
    public List<bookEntity> create(final bookEntity entity) {
        validate(entity);

        repository.save(entity);

        log.info("Entity id: {} is saved", entity.getId());

        return repository.findByUserId(entity.getUserId());
    }

    public List<bookEntity> retrieve(final String userId) {
        return repository.findByUserId(userId);
    }

    public List<bookEntity> update(final bookEntity entity) {
        validate(entity);

        final Optional<bookEntity> original = repository.findById(entity.getId());

        original.ifPresent( todo -> {
            todo.setTitle(entity.getTitle());

            repository.save(todo);
        });

        return retrieve(entity.getUserId());
    }

    public List<bookEntity> delete(final bookEntity entity) {
        validate(entity);

        try {
            repository.delete(entity);
        } catch (Exception e) {
            log.error("error deleting entity", entity.getId(), e);
            throw new RuntimeException("error deleting entity" + entity.getId());
        }
        return retrieve(entity.getUserId());
    }

    private void validate(final bookEntity entity) {
        if(entity == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }

        if(entity.getUserId() == null) {
            log.warn("Unknown user.");
            throw new RuntimeException("Unknown user.");
        }
    }
}
