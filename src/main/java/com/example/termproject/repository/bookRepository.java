package com.example.termproject.repository;

import com.example.termproject.model.bookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface bookRepository extends JpaRepository<bookEntity, String> {
    List<bookEntity> findByUserId(String userId);
}
