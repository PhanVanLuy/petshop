package com.luyphan.petshop.service.serviceImp;

import com.luyphan.petshop.controller.presentation.AddProductRequest;
import com.luyphan.petshop.entity.ProductEntity;
import com.luyphan.petshop.repository.ProductRepository;
import com.luyphan.petshop.service.ProductService;
import org.apache.logging.log4j.LogManager;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImp implements ProductService {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(ProductServiceImp.class);
    final
    ProductRepository productRepository;

    public ProductServiceImp(ProductRepository productRepository) {
        this.productRepository = productRepository;
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
    public List<ProductEntity> getProductSearched(String keyword){
        List<ProductEntity> productInfos;
        try{
            productInfos = productRepository.search(keyword);
            return productInfos;
        }catch (Exception e){
            LOGGER.error("ERROR: Get list product search ");
            return null;
        }
    }

    public List<ProductEntity> getProductByCategoryId(Integer categoryId){
        List<ProductEntity> productInfos;
        try{
            productInfos = productRepository.getProductEntitiesByCategoryType(categoryId);
            return productInfos;
        }catch (Exception e){
            LOGGER.error("ERROR: Get list product by categoryId ");
            return null;
        }
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
    public ProductEntity updateProduct( ProductEntity productDetail, Integer productId){
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
            LOGGER.error("Error delete product log message");
            return false;
        }
        LOGGER.info("Info delete product log message");
        return  true;
    }



}
