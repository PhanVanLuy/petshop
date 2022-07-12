package com.luyphan.petshop.serviceImp;

import com.luyphan.petshop.entity.ProductInfo;
import com.luyphan.petshop.repository.ProductRepository;
import com.luyphan.petshop.service.ProductService;
import org.apache.logging.log4j.LogManager;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Configuration
@Service
public class ProductServiceImp implements ProductService {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(ProductInfo.class);
    final
    ProductRepository productRepository;

    public ProductServiceImp(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public Page<ProductInfo> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public List<ProductInfo> getProducts(){
        List<ProductInfo> productInfos;
        try{
            productInfos = productRepository.findAll(Sort.by("id").ascending());
            return productInfos;
        }catch (Exception e){
            LOGGER.error("ERROR: Get list product");
            return null;
        }
    }

    @Override
    public Page<ProductInfo> findAll(Integer categoryId, Pageable pageable) {

        return productRepository.findAll(pageable);
    }

    @Override
    public Optional<ProductInfo> findOne(Integer productId){
        return productRepository.findById(productId);
    }

}
