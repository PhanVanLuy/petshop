package com.luyphan.petshop.controller;


import com.luyphan.petshop.controller.presentation.AddUserRequest;
import com.luyphan.petshop.entity.UserEntity;
import com.luyphan.petshop.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("api/v1/")
public class UserController {

    private final UserService userService;

    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(UserController.class);

    public UserController(UserService UserService) {
        this.userService = UserService;
    }

    @GetMapping("users")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }
    @GetMapping(value = "users/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable(value = "id") Integer userId) throws ResourceNotFoundException {
        return ResponseEntity.ok(userService.getUserById(userId));
    }
    @PostMapping("/users")
    public UserEntity createUser(@RequestBody AddUserRequest user) {
        return userService.saveUser(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable(value = "id") Integer userID,
                                                 @RequestBody UserEntity user) throws ResourceNotFoundException {
        return ResponseEntity.ok(userService.updateUser(user, userID));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable(value = "id") Integer userId)
            throws ResourceNotFoundException {
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @PostMapping("login")
    public boolean login(@RequestBody UserEntity user){
        try
        {
            List<UserEntity> listUser= userService.getUsers();
            return listUser.stream().anyMatch(user1 ->
                    Objects.equals(user.getEmail(), user1.getEmail())
                            && Objects.equals(user.getPassword(), user1.getPassword())
            );
        }catch (NullPointerException e){
            LOGGER.error("List user is null");
            return false;
        }
    }
    @RequestMapping("user")
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization")
                .substring("Basic".length()).trim();
        return () ->  new String(Base64.getDecoder()
                .decode(authToken)).split(":")[0];
    }

}
