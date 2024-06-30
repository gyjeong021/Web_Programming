package com.example.termproject.repository;

import com.example.termproject.model.lectureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface lectureRepository extends JpaRepository<lectureEntity, String> {
    List<lectureEntity> findByUserId(String userId);
}
