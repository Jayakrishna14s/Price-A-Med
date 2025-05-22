package com.evernorth.profilesetup.kafka.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.AddDependentDTO;
import com.evernorth.profilesetup.dto.AllergyDTO;
import com.evernorth.profilesetup.dto.BasicInfoDTO;
import com.evernorth.profilesetup.dto.ContactInfoDTO;
import com.evernorth.profilesetup.dto.CurrentMedicationDTO;
import com.evernorth.profilesetup.dto.DeliveryAddressDTO;
import com.evernorth.profilesetup.dto.HealthConditionDTO;
import com.evernorth.profilesetup.dto.PaymentInfoDTO;
import com.evernorth.profilesetup.dto.UpdateDependentDTO;

@Service
public class MemberProfileSetupProducer {
    private static final String TOPIC = "MemberProfileSetup";
    private static final Logger logger = LoggerFactory.getLogger(MemberProfileSetupProducer.class);

    @Autowired
    private KafkaTemplate<String, BasicInfoDTO> kafkaTemplate1;

    @Autowired
    private KafkaTemplate<String, ContactInfoDTO> kafkaTemplate2;

    @Autowired
    private KafkaTemplate<String, CurrentMedicationDTO> kafkaTemplate3;

    @Autowired
    private KafkaTemplate<String, HealthConditionDTO> kafkaTemplate4;

    @Autowired
    private KafkaTemplate<String, AllergyDTO> kafkaTemplate5;

    @Autowired
    private KafkaTemplate<String, DeliveryAddressDTO> kafkaTemplate6;

    @Autowired
    private KafkaTemplate<String, PaymentInfoDTO> kafkaTemplate7;

    @Autowired
    private KafkaTemplate<String, AddDependentDTO> kafkaTemplate8;

    @Autowired
    private KafkaTemplate<String, UpdateDependentDTO> kafkaTemplate9;

    public void publishPayload(BasicInfoDTO payload, int PARTITION) {
        try {
            kafkaTemplate1.send(TOPIC, PARTITION, null, payload);
            logger.info("Basic Info request published to topic: {} on partition: {}", TOPIC, PARTITION);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }

    public void publishPayload(ContactInfoDTO payload, int PARTITION) {
        try {
            kafkaTemplate2.send(TOPIC, PARTITION, null, payload);
            logger.info("Contact Info request published to topic: {} on partition: {}", TOPIC, PARTITION);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }

    public void publishPayload(CurrentMedicationDTO payload, int PARTITION) {
        try {
            kafkaTemplate3.send(TOPIC, PARTITION, null, payload);
            logger.info("Current Medications request published to topic: {} on partition: {}", TOPIC, PARTITION);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }

    public void publishPayload(HealthConditionDTO payload, int PARTITION) {
        try {
            kafkaTemplate4.send(TOPIC, PARTITION, null, payload);
            logger.info("Health Conditions request published to topic: {} on partition: {}", TOPIC, PARTITION);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }

    public void publishPayload(AllergyDTO payload, int PARTITION) {
        try {
            kafkaTemplate5.send(TOPIC, PARTITION, null, payload);
            logger.info("Allergies request published to topic: {} on partition: {}", TOPIC, PARTITION);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }

    public void publishPayload(DeliveryAddressDTO payload, int PARTITION) {
        try {
            kafkaTemplate6.send(TOPIC, PARTITION, null, payload);
            logger.info("Delivery Address request published to topic: {} on partition: {}", TOPIC, PARTITION);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }

    public void publishPayload(PaymentInfoDTO payload, int PARTITION) {
        try {
            kafkaTemplate7.send(TOPIC, PARTITION, null, payload);
            logger.info("Payment Info request published to topic: {} on partition: {}", TOPIC, PARTITION);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }

    public void publishPayload(AddDependentDTO payload, int PARTITION) {
        try {
            kafkaTemplate8.send(TOPIC, PARTITION, null, payload);
            logger.info("Add Dependent request published to topic: {} on partition: {}", TOPIC, PARTITION);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }

    public void publishPayload(UpdateDependentDTO payload, int PARTITION) {
        try {
            kafkaTemplate9.send(TOPIC, PARTITION, null, payload);
            logger.info("Update Dependent request published to topic: {} on partition: {}", TOPIC, PARTITION);            
        } catch (Exception e) {
            logger.error("Error while publishing to Kafka topic: {}", TOPIC, e);
            throw e;
        }
    }
} 
 