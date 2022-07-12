package com.luyphan.petshop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="product_image")
@Getter
@Setter
public class ProductImage {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="image")
    private String name;
    
//    @OneToMany(mappedBy = "country")
//    @JsonIgnore
//    private List<State> states;

}
