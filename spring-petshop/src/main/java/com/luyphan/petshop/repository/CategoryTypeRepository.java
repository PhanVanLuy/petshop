package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@RepositoryRestResource(collectionResourceRel="product", path="product")
@Repository
public interface CategoryTypeRepository extends JpaRepository<ProductEntity, Integer>{
}
