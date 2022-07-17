package com.luyphan.petshop.entity;

import com.luyphan.petshop.controller.presentation.AddProductRequest;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product_infor")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="category_type_id")
    private Integer categoryType;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Long price;

    @Column(name = "origin")
    private String origin;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private UnitEntity unit;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "first_image")
    private String image;

    @Column(name = "name")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private Set<ProductImageEntity> listImage = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private  Set<ReviewEntity> listReview= new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(Integer categoryType) {
        this.categoryType = categoryType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public UnitEntity getUnit() {
        return unit;
    }

    public void setUnit(UnitEntity unit) {
        this.unit = unit;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<ProductImageEntity> getListImage() {
        return listImage;
    }

    public void setListImage(Set<ProductImageEntity> listImage) {
        this.listImage = listImage;
    }

    public Set<ReviewEntity> getListReview() {
        return listReview;
    }

    public void setListReview(Set<ReviewEntity> listReview) {
        this.listReview = listReview;
    }

    public ProductEntity() {
    }
    public ProductEntity(AddProductRequest productEntity) {
        this.categoryType = productEntity.getCategoryType();
        this.description = productEntity.getDescription();
        this.price = productEntity.getPrice();
        this.origin = productEntity.getOrigin();
        this.unit = productEntity.getUnit();
        this.stock = productEntity.getStock();
        this.image = productEntity.getImage();
        this.name = productEntity.getName();
    }

    public ProductEntity(Integer id,
                         Integer categoryType,
                         String description,
                         Long price,
                         String origin,
                         UnitEntity unit,
                         Integer stock,
                         String image,
                         String name,
                         Set<ProductImageEntity> listImage,
                         Set<ReviewEntity> listReview,
                         Set<CartEntity> listCart,
                         Set<InvoiceDetailEntity> listProduct) {
        this.id = id;
        this.name = name;
        this.categoryType = categoryType;
        this.description = description;
        this.price = price;
        this.origin = origin;
        this.unit = unit;
        this.stock = stock;
        this.image = image;
        this.listImage = listImage;
        this.listReview = listReview;
    }
}