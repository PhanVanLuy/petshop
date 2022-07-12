package com.luyphan.petshop.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="active")
    private Boolean active;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    @Column(name = "display_name")
    private String displayName;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "uid")
    private Set<PaymentDetailEntity> listPayment= new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private Set<CartEntity> listCart= new HashSet<>();


}