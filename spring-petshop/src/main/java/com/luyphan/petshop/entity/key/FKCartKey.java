package com.luyphan.petshop.entity.key;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
@Embeddable
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class FKCartKey implements Serializable {

    @Column(name = "user_id")
    private  Integer userID;

    @Column(name = "product_id")
    private Integer productId;
}