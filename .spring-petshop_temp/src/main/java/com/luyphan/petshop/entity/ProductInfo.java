package com.luyphan.petshop.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="product_infor")
public class ProductInfo {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="category_type_id")
    private String categoryType;

    @Column(name="description")
    private String description;

    @Column(name="name")
    private String name;

    @Column(name="price")
    private Float price;

    @Column(name="origin")
    private String origin;

    @Column(name="stock")
    private Integer stock;

    @Column(name="unit_id")
    private Integer unit;

    @Column(name="firstimage")
    private String image;

    public ProductInfo() {
    }

    public ProductInfo(int id, String categoryType, String description, String name, Float price, String origin, Integer stock, Integer unit, String image) {
        this.id = id;
        this.categoryType = categoryType;
        this.description = description;
        this.name = name;
        this.price = price;
        this.origin = origin;
        this.stock = stock;
        this.unit = unit;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(String categoryType) {
        this.categoryType = categoryType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getUnit() {
        return unit;
    }

    public void setUnit(Integer unit) {
        this.unit = unit;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    //    @OneToMany(mappedBy = "country")
//    @JsonIgnore
//    private List<State> states;

}
