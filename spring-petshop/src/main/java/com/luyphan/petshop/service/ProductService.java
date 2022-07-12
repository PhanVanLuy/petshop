package com.luyphan.petshop.service;

import com.luyphan.petshop.controller.presentation.AddProductRequest;
import com.luyphan.petshop.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.validation.Valid;
import java.util.List;



public interface ProductService {
    ProductEntity getProductById(Integer productId);

    // all product show on main page
    Page<ProductEntity> findAll(Pageable pageable);

    List<ProductEntity> getProducts();
    // all product group by category
    Page<ProductEntity> findAll(Integer categoryId, Pageable pageable);

    ProductEntity saveProduct(AddProductRequest product);

    ProductEntity updateProduct(@Valid ProductEntity productDetail, Integer productId);

    Boolean deleteProduct(Integer productId);
}
