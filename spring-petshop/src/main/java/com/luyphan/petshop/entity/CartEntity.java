package com.luyphan.petshop.entity;

import com.luyphan.petshop.entity.key.FKCartKey;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "cart")
public class CartEntity {

    @EmbeddedId
    private FKCartKey id = new FKCartKey();

    @ManyToOne
    @MapsId("userID")
    @JoinColumn(name="user_id")
    private UserEntity user;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name="product_id")
    private ProductEntity product;

    @Column(name = "quality")
    private Integer quality;
}