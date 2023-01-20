package com.example.findit.services;

import com.example.findit.detailsManagers.PersonDetailsManager;
import com.example.findit.models.EmailMessage;
import com.example.findit.models.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private PersonDetailsManager personDetailsManager;

    public void sendMail(EmailMessage message , Authentication auth) {
        Person person = personDetailsManager.getUserById(message.getTo());
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(person.getEmail());
        mailMessage.setSubject("asking for items");
        mailMessage.setText(message.getBody());

        javaMailSender.send(mailMessage);
    }
}
