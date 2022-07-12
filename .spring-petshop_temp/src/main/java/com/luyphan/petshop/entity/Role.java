package com.luyphan.petshop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="role")
@Getter
@Setter
public class Role {

    @Id
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;

//    @OneToMany(mappedBy = "country")
//    @JsonIgnore
//    private List<State> states;

}
