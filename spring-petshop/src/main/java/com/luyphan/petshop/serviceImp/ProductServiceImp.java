package com.luyphan.petshop.serviceImp;

import com.luyphan.petshop.controller.presentation.AddProductRequest;
import com.luyphan.petshop.entity.ProductEntity;
import com.luyphan.petshop.repository.ProductRepository;
import com.luyphan.petshop.service.ProductService;
import org.apache.logging.log4j.LogManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;

@Service
public class ProductServiceImp implements ProductService {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(ProductEntity.class);
    final
    ProductRepository productRepository;

    public ProductServiceImp(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public Page<ProductEntity> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public List<ProductEntity> getProducts(){
        List<ProductEntity> productInfos;
        try{
            productInfos = productRepository.findAll(Sort.by("id").ascending());
            return productInfos;
        }catch (Exception e){
            LOGGER.error("ERROR: Get list product");
            return null;
        }
    }

    @Override
    public Page<ProductEntity> findAll(Integer categoryId, Pageable pageable) {

        return productRepository.findAll(pageable);
    }

    @Override
    public ProductEntity getProductById(Integer productId){
        return productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product  not found for this id: "+ productId));
    }

    @Override
    public  ProductEntity saveProduct(AddProductRequest product){

        return productRepository.save(new ProductEntity(product));
    }
    @Override
    public ProductEntity updateProduct(@Valid ProductEntity productDetail, Integer productId){
        ProductEntity product =productRepository.findById(productId).orElseThrow(()
                -> new ResourceNotFoundException("Product not found for this id: "+productId));
        product.setCategoryType(productDetail.getCategoryType());
        product.setDescription(productDetail.getDescription());
        product.setPrice(productDetail.getPrice());
        product.setOrigin(productDetail.getOrigin());
        product.setUnit(productDetail.getUnit());
        product.setStock(productDetail.getStock());
        product.setImage(productDetail.getImage());
        return productRepository.save(product);
    }
    @Override
    public  Boolean deleteProduct(Integer productId) {
        ProductEntity product = productRepository.findById(productId).orElseThrow(()
                -> new ResourceNotFoundException("Product not found for this id: " + productId));
        try {
            productRepository.delete(product);
        } catch (Exception e) {
            LOGGER.error("Error deleteStudent log message");
            return false;
        }
        LOGGER.info("Info deleteStudent log message");
        return  true;
    }

}
