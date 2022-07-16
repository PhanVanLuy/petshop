package com.luyphan.petshop.entity;

import com.luyphan.petshop.controller.presentation.AddUserRequest;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "active")
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
    private Set<PaymentDetailEntity> listPayment = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private Set<CartEntity> listCart = new HashSet<>();

    public UserEntity(AddUserRequest user) {
        this.active = user.getActive();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.role = user.getRole();
        this.displayName = user.getDisplayName();
    }

    public UserEntity() {
    }

    public UserEntity(Integer id,
                      Boolean active,
                      String email,
                      String password,
                      RoleEntity role,
                      String displayName,
                      Set<PaymentDetailEntity> listPayment,
                      Set<CartEntity> listCart) {
        this.id = id;
        this.active = active;
        this.email = email;
        this.password = password;
        this.role = role;
        this.displayName = displayName;
        this.listPayment = listPayment;
        this.listCart = listCart;
    }
}