package com.luyphan.petshop.controller;


import com.luyphan.petshop.controller.presentation.AddCategoryRequest;
import com.luyphan.petshop.entity.CategoryEntity;
import com.luyphan.petshop.service.CategoryService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("categories")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(categoryService.getCategories(), HttpStatus.OK);
    }
    @GetMapping(value = "categories/{id}")
    public ResponseEntity<CategoryEntity> getCategoryById(@PathVariable(value = "id") Integer categoryId) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.getCategoryById(categoryId));
    }
    @PostMapping("/categories")
    public CategoryEntity createCategory(@RequestBody AddCategoryRequest category) {
        return categoryService.saveCategory(category);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryEntity> updateUser(@PathVariable(value = "id") Integer categoryId,
                                                 @RequestBody CategoryEntity category) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.updateCategory(category, categoryId));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable(value = "id") Integer categoryId)
            throws ResourceNotFoundException {
        return ResponseEntity.ok(categoryService.deleteCategory(categoryId));
    }


}
