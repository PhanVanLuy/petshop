package com.luyphan.petshop.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="category_type")
@Setter
@Getter
@ToString
public class CategoryType {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)

	@Column(name = "id")
	private Integer id;

	@Column(name = "name")
	private String name;
	
//	@OneToMany(cascade=CascadeType.ALL, mappedBy="category")
//	private Set<Cart> book;
	
	//add setters and getters
	//if you are not using lombok
	
}
