package com.luyphan.petshop.controller;


import com.luyphan.petshop.controller.presentation.AddUserRequest;
import com.luyphan.petshop.entity.UserEntity;
import com.luyphan.petshop.service.UserService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/")
public class UserController {

    private final UserService  UserService;

    public UserController(UserService UserService) {
        this.UserService = UserService;
    }

    @GetMapping("users")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(UserService.getUsers(), HttpStatus.OK);
    }
    @GetMapping(value = "users/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable(value = "id") Integer userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(UserService.getUserById(userId));
    }
    @PostMapping("/users")
    public UserEntity createUser(@RequestBody AddUserRequest user) {
        return UserService.saveUser(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable(value = "id") Integer userID,
                                                 @RequestBody UserEntity user) throws ResourceNotFoundException {
        return ResponseEntity.ok(UserService.updateUser(user, userID));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable(value = "id") Integer userId)
            throws ResourceNotFoundException {
        return ResponseEntity.ok(UserService.deleteUser(userId));
    }


}
