package com.evernorth.profilesetup.kafka.producer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.SubscribeDTO;

@Service
public class SubscribeProducer {

    private static final Logger logger = LoggerFactory.getLogger(SubscribeProducer.class);
    private static final String TOPIC = "Subscribe";

    @Autowired
    private KafkaTemplate<String, SubscribeDTO> kafkaTemplate;

    public void publishPayload(SubscribeDTO payload) {    
        try {
            kafkaTemplate.send(TOPIC, payload);
            logger.info("Successfully published email -> {},  to topic: {}", payload.getEmail(), TOPIC);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }
}   





// import org.springframework.kafka.support.SendResult;


// SendResult<String, String> result = kafkaTemplate.send(TOPIC, email).get();
// if (result != null) {
//     int partition = result.getRecordMetadata().partition();
//     long offset = result.getRecordMetadata().offset();
//     logger.info("Successfully published email -> {} to topic: {}, partition: {}, offset: {}", 
//                 email, result.getRecordMetadata().topic(), partition, offset);
// }