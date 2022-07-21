package com.luyphan.petshop.controller;

import com.luyphan.petshop.common.Utility;
import com.luyphan.petshop.controller.response.CustomResponse;
import com.luyphan.petshop.entity.UserEntity;
import com.luyphan.petshop.service.EmailService;
import com.luyphan.petshop.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@RequestMapping("api/v1/")
@Controller
@CrossOrigin
public class ForgotPasswordController {
    private static final org.apache.logging.log4j.Logger LOGGER = LogManager.getLogger(ForgotPasswordController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/forgot_password")
    public ResponseEntity<?> processForgotPassword(HttpServletRequest request) {
        String email = request.getParameter("email");
        String token = RandomString.make(30);
        String resetPasswordLink ="";
        try {
            userService.updateResetPasswordToken(token, email);
            resetPasswordLink = Utility.getSiteURL(request) + "/reset_password?token=" + token;
            emailService.sendEmail(email, resetPasswordLink);

        } catch (ResourceNotFoundException | MessagingException | UnsupportedEncodingException ex) {
            LOGGER.error("Error get token");
        }

        return ResponseEntity.ok().body(new CustomResponse(200, "Process Forgot Password Ok"
                , resetPasswordLink));
    }




    @GetMapping("/reset_password")
    public ResponseEntity<?> showResetPasswordForm(@Param(value = "token") String token) {
        UserEntity customer = userService.getByResetPasswordToken(token);

        if (customer == null) {
            return ResponseEntity.ok().body(new CustomResponse(200, "Request Confirm Order Ok"
                    , "User token not found"));
        }
        return ResponseEntity.ok().body(new CustomResponse(200, "Request Confirm Order Ok"
                , customer));
    }

    @PostMapping("/reset_password")
    public ResponseEntity<?> processResetPassword(HttpServletRequest request) {
        String token = request.getParameter("token");
        String password = request.getParameter("password");

        UserEntity user = userService.getByResetPasswordToken(token);

        if (user == null) {
            return ResponseEntity.ok().body(new CustomResponse(200, "Request Confirm Order Ok"
                    , "Invalid Token"));
        } else {

            userService.updatePassword(user, password);
            return ResponseEntity.ok().body(new CustomResponse(200, "You have successfully changed your password."
                    , user));
        }

    }
}
