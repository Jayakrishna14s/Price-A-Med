package com.evernorth.profilesetup.handler;

import com.evernorth.profilesetup.dto.SubscribeDTO;
import com.evernorth.profilesetup.service.database.SubscribeQuery;
import com.evernorth.profilesetup.service.email.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class SubscribeHandler {
    @Autowired
    private JavaMailSenderImpl mailSender;

    public SubscribeHandler() {}


    @Autowired
    private EmailService emailService;

    private static final Logger LOGGER = LoggerFactory.getLogger(SubscribeHandler.class);

    @Autowired
    SubscribeQuery subscribeQuery;

    public void handle(SubscribeDTO payload) {
        String email = payload.getEmail();
        String memberID = "";
        String type = payload.getType();

        try {
            memberID = subscribeQuery.subscribe(payload.getEmail());
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }

        try {
            emailService.sendEmail(email, memberID, type);
            LOGGER.info("Email sent to " + email + " memberID = " + memberID);
        } catch (Exception e) {
            LOGGER.error("Error sending email to " + email + " memberID = " + memberID, e);
        }
    }
}
