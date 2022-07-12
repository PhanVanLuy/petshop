package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.ProductInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@RepositoryRestResource(collectionResourceRel="product", path="product")
@Repository
public interface ProductRepository extends JpaRepository<ProductInfo, Integer>{
}
