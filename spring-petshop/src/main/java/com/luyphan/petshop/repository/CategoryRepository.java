package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@RepositoryRestResource(collectionResourceRel="product", path="product")
@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer>{
}
