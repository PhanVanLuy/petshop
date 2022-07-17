package com.luyphan.petshop.service;

import com.luyphan.petshop.controller.presentation.AddUserRequest;
import com.luyphan.petshop.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface UserService {
    UserEntity getUserById(Integer userID);

    Page<UserEntity> findAll(Pageable pageable);

    List<UserEntity> getUsers();

    Page<UserEntity> findAll(Integer categoryId, Pageable pageable);

    UserEntity saveUser(AddUserRequest user);

    UserEntity updateUser( UserEntity user, Integer UserId);

    Boolean deleteUser(Integer UserId);
}
