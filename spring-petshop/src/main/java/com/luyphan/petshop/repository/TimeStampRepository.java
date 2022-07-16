package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.TimeStampEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeStampRepository extends JpaRepository<TimeStampEntity, Integer> {
}