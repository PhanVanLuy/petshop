package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.CategoryTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends JpaRepository<CategoryTypeEntity, Long>{

}
