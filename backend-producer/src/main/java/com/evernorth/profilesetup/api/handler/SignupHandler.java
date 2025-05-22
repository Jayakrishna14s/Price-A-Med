package com.evernorth.profilesetup.api.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.dto.SignupDTO;
import com.evernorth.profilesetup.kafka.producer.SignupProducer;


@RestController
@RequestMapping("/public/api/producer/signup")
public class SignupHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(OTPHandler.class);


    @Autowired
    private SignupProducer signupProducer;

    @PostMapping
    @Async
    public String signup(@RequestBody SignupDTO payload) {
        LOGGER.info("Received signup payload");
        try {
            signupProducer.publishPayload(payload);
            System.out.println(payload.getDob());
            return "Signup Payload uploaded to Kafka topic";
 
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish email to Kafka.";
        }
    } 
}
 