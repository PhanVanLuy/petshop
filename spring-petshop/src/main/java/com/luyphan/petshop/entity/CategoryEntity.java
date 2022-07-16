package com.luyphan.petshop.entity;

import com.luyphan.petshop.controller.presentation.AddCategoryRequest;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "category_type")
public class CategoryEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name = "name")
    private String name;

    public CategoryEntity(AddCategoryRequest categoryRequest) {
        this.name = categoryRequest.getName();
    }
}