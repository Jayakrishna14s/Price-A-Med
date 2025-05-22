package com.evernorth.profilesetup.api.handler;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.dto.AddDependentDTO;
import com.evernorth.profilesetup.dto.AllergyDTO;
import com.evernorth.profilesetup.dto.BasicInfoDTO;
import com.evernorth.profilesetup.dto.ContactInfoDTO;
import com.evernorth.profilesetup.dto.CurrentMedicationDTO;
import com.evernorth.profilesetup.dto.DeliveryAddressDTO;
import com.evernorth.profilesetup.dto.HealthConditionDTO;
import com.evernorth.profilesetup.dto.PaymentInfoDTO;
import com.evernorth.profilesetup.dto.UpdateDependentDTO;
import com.evernorth.profilesetup.kafka.producer.MemberProfileSetupProducer;
import com.evernorth.profilesetup.service.jwt.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth/user/mps")
public class MemberProfileSetupHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(MemberProfileSetupHandler.class);

    @Autowired
    private MemberProfileSetupProducer memberProfileSetupProducer;

    @Autowired
    private JwtService service;

    @PostMapping("/basicinfo")
    @Async
    public String basicInfo(@RequestBody BasicInfoDTO payload, HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);

        payload.setMemberID(memberID);
        LOGGER.info("Received payload: {}, {}, {}, {}", payload.getMemberID(), payload.getImage(), payload.getFirstName(), payload.getLastName());
        
        try {
            memberProfileSetupProducer.publishPayload(payload, 0);
            return "Successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish payload to Kafka.";
        }
    }

    @PostMapping("/contactinfo")
    @Async
    public String contactinfo(@RequestBody ContactInfoDTO payload, HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);

        payload.setMemberID(memberID);
        LOGGER.info("Received payload: {}", payload.toString());

        try {
            memberProfileSetupProducer.publishPayload(payload, 1);
            return "Successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish payload to Kafka.";
        }
    }


    @PostMapping("/currentmedications")
    @Async
    public String currentMedications(@RequestBody CurrentMedicationDTO payload, HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);
        
        payload.setMemberID(memberID);
        LOGGER.info("Received payload: {}", payload.getMemberID());

        for(CurrentMedicationDTO.Pair pair: payload.getMedications()) {
            LOGGER.info(pair.getMedicationID() + " " + pair.getName());
        }

        try {
            memberProfileSetupProducer.publishPayload(payload, 2);
            return "Successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish payload to Kafka.";
        }

    }


    @PostMapping("/healthconditions")
    @Async
    public String healthConditions(@RequestBody HealthConditionDTO payload, HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);
        
        payload.setMemberID(memberID);
        LOGGER.info("Received payload: {}", payload.getMemberID());

        for(HealthConditionDTO.Pair pair: payload.getConditions()) {
            LOGGER.info(pair.getConditionID() + " " + pair.getName());
        }

        try {
            memberProfileSetupProducer.publishPayload(payload, 3);
            return "Successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish payload to Kafka.";
        }

    }


    @PostMapping("/allergies")
    @Async
    public String allergies(@RequestBody AllergyDTO payload, HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);
        
        payload.setMemberID(memberID);
        LOGGER.info("Received payload: {}", payload.getMemberID());

        for(AllergyDTO.Pair pair: payload.getAllergies()) {
            LOGGER.info(pair.getAllergyID() + " " + pair.getName());
        }

        try {
            memberProfileSetupProducer.publishPayload(payload, 4);
            return "Successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish payload to Kafka.";
        }

    }

    @PostMapping("/deliveryaddress")
    @Async
    public String deliveryAddress(@RequestBody DeliveryAddressDTO payload, HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);
        
        payload.setMemberID(memberID);
        LOGGER.info("Received payload: {}", payload.getMemberID());

        try {
            memberProfileSetupProducer.publishPayload(payload, 5);
            return "Successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish payload to Kafka.";
        }

    }


    @PostMapping("/paymentinfo")
    @Async
    public String paymentInfo(@RequestBody PaymentInfoDTO payload, HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);
        
        payload.setMemberID(memberID);
        LOGGER.info("Received payload: {}", payload.getMemberID());

        try {
            memberProfileSetupProducer.publishPayload(payload, 6);
            return "Successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish payload to Kafka.";
        }

    }

    @PostMapping("/addDependent")
    @Async
    public String addDependent(@RequestBody AddDependentDTO payload, HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);
        
        payload.setMemberID(memberID);
        LOGGER.info("Received payload: {}", payload.getMemberID());

        try {
            memberProfileSetupProducer.publishPayload(payload, 7);
            return "Successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish payload to Kafka.";
        }

    }

    @PostMapping("/updateDependent")
    @Async
    public String updateDependent(@RequestBody UpdateDependentDTO payload, HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);
        
        payload.setMemberID(memberID);
        LOGGER.info("Received payload: {}", payload.getMemberID());

        try {
            memberProfileSetupProducer.publishPayload(payload, 8);
            return "Successfully published to Kafka topic!";
        } catch (Exception e) {
            LOGGER.error("Error while publishing email to Kafka", e);
            return "Failed to publish payload to Kafka.";
        }

    }
}
 