package com.luyphan.petshop.repository;

import com.luyphan.petshop.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="cart", path="cart")
public interface CartRepository extends JpaRepository<CartEntity, Long>{

}
