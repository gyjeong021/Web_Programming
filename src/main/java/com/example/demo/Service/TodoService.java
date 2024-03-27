package com.example.demo.Service;

import com.example.demo.model.TodoEntity;
import com.example.demo.repository.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class TodoService {
    @Autowired
    private TodoRepository repository;

    public String testService() {
        TodoEntity entity = TodoEntity.builder().title("My first Todo item").build();

        repository.save(entity);

        TodoEntity savedEntity = repository.findById(entity.getId()).get();

        return savedEntity.getTitle();
    }

    // Todo 아이템 생성
    public List<TodoEntity> create(final TodoEntity entity) {
        validate(entity);

        repository.save(entity);

        log.info("Entity id: {} is saved", entity.getId());

        return repository.findByUserId(entity.getUserId());
    }

    public List<TodoEntity> retrieve(final String userId) {
        return repository.findByUserId(userId);
    }

    private void validate(final TodoEntity entity) {
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
