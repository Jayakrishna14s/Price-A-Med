//package com.evernorth.profilesetup.kafka.subscribe;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//public class SubscribeFeedbackProducer {
//    private static final Logger LOGGER = LoggerFactory.getLogger(SubscribeFeedbackProducer.class);
//    private static final String TOPIC = "SubscribeFeedback";
//
//    @Autowired
//    private KafkaTemplate<String, SubscribeFeedbackDTO> kafkaTemplate;
//
//    public void publishFeedback(SubscribeFeedbackDTO payload) {
//        try {
//            kafkaTemplate.send(TOPIC, payload);
//            LOGGER.info("Published feedback: " + payload);
//        } catch (Exception e) {
//            LOGGER.error("Failed to publish feedback: " + payload, e);
//            throw e;
//        }
//    }
//}
