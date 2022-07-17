package com.luyphan.petshop.service;

import com.luyphan.petshop.controller.presentation.AddProductRequest;
import com.luyphan.petshop.entity.ProductEntity;

import java.util.List;



public interface ProductService {
    ProductEntity getProductById(Integer productId);


    List<ProductEntity> getProducts();

    List<ProductEntity> getProductSearched(String keyword);

    List<ProductEntity> getProductByCategoryId(Integer categoryID);


    ProductEntity saveProduct(AddProductRequest product);

    ProductEntity updateProduct( ProductEntity productDetail, Integer productId);

    Boolean deleteProduct(Integer productId);


}
