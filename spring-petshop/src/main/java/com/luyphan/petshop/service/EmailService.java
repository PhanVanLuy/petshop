package com.luyphan.petshop.service;


import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailService {

    void sendEmail(String recipientEmail, String link)
            throws MessagingException, UnsupportedEncodingException;

//
}
