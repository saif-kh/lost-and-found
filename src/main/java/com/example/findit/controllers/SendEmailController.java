package com.example.findit.controllers;

import com.example.findit.models.EmailMessage;
import com.example.findit.services.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SendEmailController {

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping(value = "/send_smail")
    public void sendEmail(@RequestBody EmailMessage message, Authentication authentication){
        emailSenderService.sendMail(message ,authentication);
    }
}
