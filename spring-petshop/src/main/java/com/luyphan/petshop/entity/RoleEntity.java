package com.luyphan.petshop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "role")
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="role_name")
    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "id")
    private Set<UserEntity> listUser = new HashSet<>();

    public RoleEntity() {

    }

    public RoleEntity(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}