package com.luyphan.petshop.entity;

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
@Table(name = "review")
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name = "uid")
    private int uid;

    @Column(name = "star")
    private int star;

    @Column(name = "comment")
    private int comment;

    @ManyToOne
    @JoinColumn(name = "product_infor_id")
    private ProductEntity product;

    @Column(name = "timestamp")
    private int timestamp;




}