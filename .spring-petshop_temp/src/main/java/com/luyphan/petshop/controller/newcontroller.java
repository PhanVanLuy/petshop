package com.luyphan.petshop.controller;

import com.luyphan.petshop.service.ProductService;
import org.apache.logging.log4j.LogManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

public class newcontroller {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(ProductController.class);
    private final ProductService productService;

    public newcontroller(ProductService productService) {
        this.productService = productService;
    }

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
