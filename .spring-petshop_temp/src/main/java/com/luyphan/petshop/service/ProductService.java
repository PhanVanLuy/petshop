package com.luyphan.petshop.service;

import com.luyphan.petshop.entity.ProductInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface ProductService {
    Optional<ProductInfo> findOne(Integer productId);

    // all product show on main page
    Page<ProductInfo> findAll(Pageable pageable);

    List<ProductInfo> getProducts();
    // all product group by category
    Page<ProductInfo> findAll(Integer categoryId, Pageable pageable);

}
