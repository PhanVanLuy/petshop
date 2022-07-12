package com.luyphan.petshop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="user")
@Getter
@Setter
public class User {

    @Id
    @Column(name="id")
    private Integer id;

    @Column(name="active")
    private Boolean active;

    @Column(name="address")
    private String address;

    @Column(name="email")
    private String email;

    @Column(name="dob")
    private Date dob;

    @Column(name="password")
    private String password;

    @Column(name="phonenumber")
    private String phoneNumber;

    @Column(name="role_id")
    private Integer role;



//    @OneToMany(mappedBy = "country")
//    @JsonIgnore
//    private List<State> states;

}
