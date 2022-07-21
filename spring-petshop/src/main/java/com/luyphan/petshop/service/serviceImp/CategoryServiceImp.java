package com.luyphan.petshop.service.serviceImp;

import com.luyphan.petshop.controller.presentation.AddCategoryRequest;
import com.luyphan.petshop.entity.CategoryEntity;
import com.luyphan.petshop.repository.CategoryRepository;
import com.luyphan.petshop.service.CategoryService;
import org.apache.logging.log4j.LogManager;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImp implements CategoryService {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(CategoryServiceImp.class);
    final
    CategoryRepository categoryRepository;

    public CategoryServiceImp(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public List<CategoryEntity> getCategories(){
        List<CategoryEntity> categoryInfos;
        try{
            categoryInfos = categoryRepository.findAll(Sort.by("id").ascending());
            return categoryInfos;
        }catch (Exception e){
            LOGGER.error("ERROR: Get list category");
            return null;
        }
    }

    @Override
    public CategoryEntity getCategoryById(Integer categoryId){
        return categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: "+ categoryId));
    }

    @Override
    public  CategoryEntity saveCategory(AddCategoryRequest categoryRequest){

        return categoryRepository.save(new CategoryEntity(categoryRequest));
    }
    @Override
    public CategoryEntity updateCategory( CategoryEntity categoryDetail, Integer categoryId){
        CategoryEntity category =categoryRepository.findById(categoryId).orElseThrow(()
                -> new ResourceNotFoundException("Category not found for this id: "+categoryId));
        category.setName(categoryDetail.getName());
        return categoryRepository.save(category);
    }
    @Override
    public  Boolean deleteCategory(Integer categoryId) {
        CategoryEntity category = categoryRepository.findById(categoryId).orElseThrow(()
                -> new ResourceNotFoundException("Category not found for this id: " + categoryId));
        try {
            categoryRepository.delete(category);
        } catch (Exception e) {
            LOGGER.error("Error delete category log message");
            return false;
        }
        LOGGER.info("Info delete category log message");
        return  true;
    }

}
