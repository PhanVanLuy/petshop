package com.luyphan.petshop.serviceImp;

import com.luyphan.petshop.controller.presentation.AddUserRequest;
import com.luyphan.petshop.entity.UserEntity;
import com.luyphan.petshop.repository.UserRepository;
import com.luyphan.petshop.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;

@Service
public class UserServiceImp implements UserService {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(UserServiceImp.class);
    final UserRepository userRepository;

    public UserServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public Page<UserEntity> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public List<UserEntity> getUsers(){
        List<UserEntity> userEntities;
        try{
            userEntities = userRepository.findAll(Sort.by("email").ascending());
            return userEntities;
        }catch (Exception e){
            LOGGER.error("ERROR: Get list user");
            return null;
        }
    }

    @Override
    public Page<UserEntity> findAll(Integer categoryId, Pageable pageable) {

        return userRepository.findAll(pageable);
    }

    @Override
    public UserEntity getUserById(Integer id){
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User  not found for this id: "+ id));
    }

    @Override
    public  UserEntity saveUser(AddUserRequest user){

        return userRepository.save(new UserEntity(user));
    }
    @Override
    public UserEntity updateUser(@Valid UserEntity userDetail, Integer id){
        UserEntity user =userRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("User not found for this id: "+id));
        user.setActive(userDetail.getActive());
        user.setDisplayName(userDetail.getDisplayName());
        user.setEmail(userDetail.getEmail());
        user.setPassword(userDetail.getPassword());
        return userRepository.save(user);
    }
    @Override
    public  Boolean deleteUser(Integer id) {
        UserEntity user = userRepository.findById(id).orElseThrow(()
                -> new ResourceNotFoundException("User not found for this id: " + id));
        try {
            userRepository.delete(user);
        } catch (Exception e) {
            LOGGER.error("Error delete user log message");
            return false;
        }
        LOGGER.info("Info delete user log message");
        return  true;
    }

}