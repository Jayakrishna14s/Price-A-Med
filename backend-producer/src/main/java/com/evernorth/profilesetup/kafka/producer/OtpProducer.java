package com.evernorth.profilesetup.kafka.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.OtpDTO;

@Service
public class OtpProducer {
    private static final Logger logger = LoggerFactory.getLogger(OtpProducer.class);
    private static final String TOPIC = "Otp";

    @Autowired
    private KafkaTemplate<String, OtpDTO> kafkaTemplate;
    public void publishPayload(OtpDTO payload) {
        try {
            kafkaTemplate.send(TOPIC, payload);
            logger.info("Successfully published email -> {},  to topic: {}", payload.getEmail(), TOPIC);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }
}
