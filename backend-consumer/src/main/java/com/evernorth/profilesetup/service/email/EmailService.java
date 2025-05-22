package com.evernorth.profilesetup.service.email;

import com.evernorth.profilesetup.service.email.template.EmailTemplate;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String email, String body, String type)  {
        try {
            String template = getTemplate(body, type);
            LOGGER.info(template);
            String subject = getSubject(type);
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(template, true);
            mailSender.send(mimeMessage);
            LOGGER.info("Email sent successfully");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }

    public String getTemplate(String body, String type) throws IOException, URISyntaxException {
        return EmailTemplate.getSubscribeTemplate(body, "http://localhost:5173/signup");
    }

    public String getSubject(String type) {
        return "Thank You for Joining us! Your Health Coverage is Now Active";
    }
}




//
//try {
//SimpleMailMessage message = new SimpleMailMessage();
//            message.setFrom("airflow.jk.14@gmail.com");
//            message.setTo(email);
//            message.setSubject("Hello from Spring Boot");
//            message.setText(body);
////            mailSender.send(message);
//            LOGGER.info("Email sent successfully to: " + email);
//        } catch (MailException e) {
//        LOGGER.error("Error sending email", e);
//        }









//    @Autowired
//    private SubscribeFeedbackProducer subscribeFeedbackProducer;


//        SubscribeFeedbackDTO subscribeFeedbackDTO = new SubscribeFeedbackDTO();
//        subscribeFeedbackDTO.setTaskID(payload.getTaskID());



//            subscribeFeedbackDTO.setStatus(true);
//            subscribeFeedbackProducer.publishFeedback(subscribeFeedbackDTO);
//            LOGGER.info("Feedback published to SubscribeFeedback Topic: " + payload.getEmail());


//            subscribeFeedbackDTO.setStatus(false);
//            subscribeFeedbackProducer.publishFeedback(subscribeFeedbackDTO);