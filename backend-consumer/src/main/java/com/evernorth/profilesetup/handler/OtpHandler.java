package com.evernorth.profilesetup.handler;

import com.evernorth.profilesetup.dto.OtpDTO;
import com.evernorth.profilesetup.service.email.EmailService;
//import com.evernorth.profilesetup.service.redis.OtpQuery;
//import com.evernorth.profilesetup.service.redis.entity.Otp;
import com.evernorth.profilesetup.service.redis.OtpQuery;
import com.evernorth.profilesetup.service.redis.entity.Otp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;


@Service
public class OtpHandler {
    @Autowired
    private OtpQuery otpQuery;

    public  OtpHandler() {}

    @Autowired
    private EmailService emailService;

    private static final Logger LOGGER = LoggerFactory.getLogger(OtpHandler.class);

    public void handle(OtpDTO payload) {
        String email = payload.getEmail();
        String otp = generateOTP();
        String type = payload.getType();

        LOGGER.info(email + " " + otp + " " + type);

        try {
            otpQuery.save(new Otp(payload.getTaskID(), otp));
            LOGGER.info("OTP created in redis");
            Otp gerFromredis =  otpQuery.findById(payload.getTaskID());
            LOGGER.info(gerFromredis.getOtp());
            List<Otp> list = otpQuery.findAll();
            for (Otp otp1 : list) {
                LOGGER.info(otp1.getId() + " " + otp1.getOtp() + "    JUJUTSU");
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }

        try {
            emailService.sendEmail(email, otp, type);
            LOGGER.info("Email sent to " + email);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }

        // push taskID: otp into redis //
    }

    private String generateOTP() {
        final String ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        final int STRING_LENGTH = 32;
        final int RANDOM_INDICES = 8;

        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < STRING_LENGTH; i++) {
            sb.append(ALPHANUMERIC.charAt(random.nextInt(ALPHANUMERIC.length())));
        }

        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < RANDOM_INDICES; i++) {
            otp.append(sb.charAt(random.nextInt(STRING_LENGTH)));
        }

        return otp.toString();
    }

}



//            LOGGER.info(otpQuery.delete(payload.getTaskID()));
//            List<Otp> list1 = otpQuery.findAll();
//            for (Otp otp1 : list1) {
//                LOGGER.info(otp1.getId() + " " + otp1.getOtp() + "    JUJUTSU");
//            }
//
//            LOGGER.info(otpQuery.deleteAll() );
//            List<Otp> list2 = otpQuery.findAll();
//            for (Otp otp1 : list2) {
//                LOGGER.info(otp1.getId() + " " + otp1.getOtp() + "    JUJUTSU");
//            }