package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="productCategory", path="product-category")
public interface ProductCategoryRepository extends JpaRepository<CategoryType, Long>{

}
