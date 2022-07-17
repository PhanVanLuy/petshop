package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

//@RepositoryRestResource(collectionResourceRel="product", path="product")
@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer>{
    @Query("SELECT p FROM ProductEntity p WHERE p.name LIKE %?1%"
            + " OR p.origin LIKE %?1%"
            + " OR CONCAT(p.price, '') LIKE %?1%")
            //we must concatenate it with an empty string so its value can be compared using the LIKE operator:
    List<ProductEntity> search(String keyword);

    @Query("select p from  ProductEntity p " +
            "inner join  CategoryEntity  c " +
            "on c.id = p.categoryType " +
            "and c.id = ?1"
    )
    List<ProductEntity> getProductEntitiesByCategoryType(Integer categoryId);
}
