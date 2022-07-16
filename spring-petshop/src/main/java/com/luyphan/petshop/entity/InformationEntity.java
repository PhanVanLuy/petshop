package com.luyphan.petshop.entity;

import com.luyphan.petshop.controller.presentation.AddInfoRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "information")
public class InformationEntity {
    @Id  @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "company")
    private String company;

    @Column(name = "phone")
    private String phone;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "address")
    private String address;

    @Column(name = "apartment")
    private String apartment;

    @Column(name = "city")
    private String city;

    @Column(name = "countryName")
    private String countryName;

    @Column(name = "postalCode")
    private String postalCode;

    @ManyToOne
    @JoinColumn(name = "uid", nullable = false)
    private UserEntity uid;

    public InformationEntity(AddInfoRequest info) {
        this.firstName = info.getFirstName();
        this.lastName = info.getLastName();
        this.company = info.getCompany();
        this.phone = info.getPhone();
        this.dob = info.getDob();
        this.address = info.getAddress();
        this.apartment = info.getApartment();
        this.city = info.getCity();
        this.countryName = info.getCountryName();
        this.postalCode = info.getPostalCode();
        this.uid = info.getUser();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getApartment() {
        return apartment;
    }

    public void setApartment(String apartment) {
        this.apartment = apartment;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public UserEntity getUid() {
        return uid;
    }

    public void setUid(UserEntity uid) {
        this.uid = uid;
    }
}