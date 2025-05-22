package com.evernorth.profilesetup.api.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.dto.OtpDTO;
import com.evernorth.profilesetup.kafka.producer.OtpProducer;

@RestController
@RequestMapping("/public/api/producer/otp")
public class OTPHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(OTPHandler.class);

    @Autowired
    private OtpProducer otpProducer;

    @PostMapping
    @Async 
    public String sendOTP(@RequestBody OtpDTO payload) {
        LOGGER.info("Received payload: {}, {}", payload.getTaskID(), payload.getEmail());

        try {
            otpProducer.publishPayload(payload);
            return "Email: " + payload.getEmail() + " successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish email to Kafka.";
        }
    }

}
