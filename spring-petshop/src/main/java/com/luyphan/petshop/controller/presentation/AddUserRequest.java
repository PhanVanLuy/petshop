package com.luyphan.petshop.controller.presentation;

import com.luyphan.petshop.entity.RoleEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserRequest {
    private Boolean active;
    private String email;
    private String password;
    private RoleEntity role;
    private String displayName;

    public AddUserRequest(Boolean active, String email, String password, RoleEntity role, String displayName) {
        this.active = active;
        this.email = email;
        this.password = password;
        this.role = role;
        this.displayName = displayName;
    }

    public AddUserRequest() {
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleEntity getRole() {
        return role;
    }

    public void setRole(RoleEntity role) {
        this.role = role;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
