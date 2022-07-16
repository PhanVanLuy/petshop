package com.luyphan.petshop.service;

import com.luyphan.petshop.controller.presentation.AddProductRequest;
import com.luyphan.petshop.entity.ProductEntity;

import javax.validation.Valid;
import java.util.List;



public interface ProductService {
    ProductEntity getProductById(Integer productId);


    List<ProductEntity> getProducts();


    ProductEntity saveProduct(AddProductRequest product);

    ProductEntity updateProduct(@Valid ProductEntity productDetail, Integer productId);

    Boolean deleteProduct(Integer productId);
}
