package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.ReviewImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewImageRepository extends JpaRepository<ReviewImageEntity, Integer> {
}