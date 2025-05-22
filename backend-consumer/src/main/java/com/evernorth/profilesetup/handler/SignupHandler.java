package com.evernorth.profilesetup.handler;


import com.evernorth.profilesetup.dto.OtpDTO;
import com.evernorth.profilesetup.dto.SignupDTO;
import com.evernorth.profilesetup.service.database.SignupQuery;
import com.evernorth.profilesetup.service.database.repository.MemberRepository;
import com.evernorth.profilesetup.service.email.EmailService;
//import com.evernorth.profilesetup.service.redis.OtpQuery;
//import com.evernorth.profilesetup.service.redis.entity.Otp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupHandler {

//
//    @Autowired
//    private OtpQuery otpQuery;

    public SignupHandler() {}

    @Autowired
    SignupQuery signupQuery;

    @Autowired
    EmailService emailService;

    private static final Logger LOGGER = LoggerFactory.getLogger(OtpHandler.class);

    public void handle(SignupDTO payload) {
        try {
            signupQuery.signup(payload);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }

//        try {
//            memberRepository.setActive(payload.getMemberID());
//        } catch (Exception e) {
//            LOGGER.error(e.getMessage());
//            return;
//        }



        try {
            emailService.sendEmail(payload.getEmail(), "Registered", "registered");
            LOGGER.info("Email sent to " + payload.getEmail() + " after registered");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
    }
}
