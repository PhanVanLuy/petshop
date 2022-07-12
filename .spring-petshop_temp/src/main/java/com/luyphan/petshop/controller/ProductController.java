package com.luyphan.petshop.controller;


import com.luyphan.petshop.service.ProductService;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/")
@AllArgsConstructor
public class ProductController {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(ProductController.class);
    private final ProductService  productService;

    @GetMapping("products")
    public ResponseEntity<?> findAll(){
        LOGGER.debug("helloWorld");
        return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
    }
    @PostMapping("123")
    public void test(){
        LOGGER.error("===========================================");
    }
}
