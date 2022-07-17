package com.luyphan.petshop.service;

import com.luyphan.petshop.controller.presentation.AddCategoryRequest;
import com.luyphan.petshop.entity.CategoryEntity;

import java.util.List;


public interface CategoryService {
    CategoryEntity getCategoryById(Integer categoryId);


    List<CategoryEntity> getCategories();


    CategoryEntity saveCategory(AddCategoryRequest category);

    CategoryEntity updateCategory( CategoryEntity categoryDetail, Integer categoryId);

    Boolean deleteCategory(Integer categoryId);
}
