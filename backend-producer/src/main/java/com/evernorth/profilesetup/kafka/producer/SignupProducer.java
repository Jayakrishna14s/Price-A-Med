package com.evernorth.profilesetup.kafka.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.SignupDTO;

@Service
public class SignupProducer {
    private static final Logger logger = LoggerFactory.getLogger(SignupProducer.class);
    private static final String TOPIC = "Signup";

    @Autowired
    private KafkaTemplate<String, SignupDTO> kafkaTemplate;

    public void publishPayload(SignupDTO payload) {
        try {
            kafkaTemplate.send(TOPIC, payload);
            logger.info("Successfully published SignupDTO");            
        } catch(Exception e) {
            logger.info(e.getMessage());
            throw e;
        }
    }
}
