package com.evernorth.profilesetup.api.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import com.evernorth.profilesetup.dto.SubscribeDTO;
import com.evernorth.profilesetup.kafka.producer.SubscribeProducer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/public/api/producer/subscribe")
public class SubscribeHandler {

    private static final Logger logger = LoggerFactory.getLogger(SubscribeHandler.class);

    @Autowired
    private SubscribeProducer subscribeProducer;

    @PostMapping
    @Async
    public String subscribe(@RequestBody SubscribeDTO payload) {
        logger.info("Received payload: {}, {}", payload.getTaskID(), payload.getEmail());

        try {
            subscribeProducer.publishPayload(payload);
            return "Email: " + payload.getEmail() + " successfully published to Kafka topic!!";
        } catch (Exception e) {
            logger.error("Error while publishing email to Kafka", e);
            return "Failed to publish email to Kafka.";
        }
    }
} 
