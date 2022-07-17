package com.luyphan.petshop.controller;


import com.luyphan.petshop.controller.presentation.AddProductRequest;
import com.luyphan.petshop.entity.ProductEntity;
import com.luyphan.petshop.service.ProductService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/")
public class ProductController {

    private final ProductService  productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("products")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
    }
    @GetMapping(value = "products/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable(value = "id") Integer productId) throws ResourceNotFoundException {
        return ResponseEntity.ok(productService.getProductById(productId));
    }
    @PostMapping("products")
    public ProductEntity createProduct(@RequestBody AddProductRequest product) {
        return productService.saveProduct(product);
    }

    @PutMapping("products/{id}")
    public ResponseEntity<ProductEntity> updateProduct(@PathVariable(value = "id") Integer productId,
                                                 @RequestBody ProductEntity productDetails) throws ResourceNotFoundException {
        return ResponseEntity.ok(productService.updateProduct(productDetails, productId));
    }

    @DeleteMapping("products/{id}")
    public ResponseEntity<Boolean> deleteProduct(@PathVariable(value = "id") Integer productId)
            throws ResourceNotFoundException {
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }

    @GetMapping("search/{name}")
    public ResponseEntity<?> searchList( @PathVariable(value = "name") String keyword)
        throws ResourceNotFoundException{
        return new ResponseEntity<>(productService.getProductSearched(keyword), HttpStatus.OK);
    }

    @GetMapping("category/{cateId}")
    public ResponseEntity<?> getByCategoryId( @PathVariable(value = "cateId") Integer cateId)
        throws ResourceNotFoundException{
        return new ResponseEntity<>(productService.getProductByCategoryId(cateId), HttpStatus.OK);
    }





}
