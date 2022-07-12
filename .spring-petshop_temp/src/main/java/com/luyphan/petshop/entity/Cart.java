package com.luyphan.petshop.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name="cart")
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Cart implements Serializable {
	@Id
	@Column(name="user_id")
	private Integer id;
	@Id
	@Column(name="product_id")
	private Integer productId;

	@Column(name = "quality")
	private Long quality;
//	@ManyToOne
//	@JoinColumn(name="category_id", nullable=false)
//	private BookCategory category;

	//add setters and getters
	//if you are not using lombok
}

