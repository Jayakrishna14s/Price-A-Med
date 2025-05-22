package com.evernorth.profilesetup.api.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.service.database.repository.MemberRepository;
import com.evernorth.profilesetup.service.redis.OtpQuery;
import com.evernorth.profilesetup.service.redis.entity.Otp;

import java.util.Optional;
import com.evernorth.profilesetup.service.database.entity.Member;

@RestController
@RequestMapping("/public/api/validate")
public class SignupValidate {

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/signup")
    @Async
    public ResponseEntity<Map<String, Object>> isSignupValid(@RequestParam String memberID, @RequestParam(required = false) String email, @RequestParam int stage) {

        
        Optional<Member> memberOptional = memberRepository.findByMemberID(memberID);
        Map<String, Object> response = new HashMap<>();
        if(stage == 1) {
            if(!memberOptional.isPresent()){
                response.put("exists", false);
                response.put("message", "MemberID is invalid!");
            } else {
                boolean active = memberOptional.get().isActive();
                if(active) {
                    response.put("exists", false); 
                    response.put("message", "Account already exists");
                } else {
                    response.put("exists", true);
                    response.put("message", "possible");
                }
            }
            return ResponseEntity.ok(response);
        }

        String DB_EMAIL = memberOptional.get().getEmail();
        String DB_MEMBERID = memberOptional.get().getMemberID();

        if(!DB_EMAIL.equals(email) || !DB_MEMBERID.equals(memberID)) {
            response.put("valid", false);
        } else {
            response.put("valid", true);
        }

        return ResponseEntity.ok(response);
    }

    @Autowired
    private OtpQuery otpQuery;

    @GetMapping("/otp")
    @Async
    public ResponseEntity<Map<String, Object>> isSignupValid(@RequestParam String taskID, @RequestParam String otp) {
        Map<String, Object> response = new HashMap<>();

        Otp ob = otpQuery.findById(taskID);
        if(ob == null) { 
            response.put("valid", false);
            return ResponseEntity.ok(response);
        }

        boolean valid = ob.getOtp().equals(otp);
        System.out.println(ob.getOtp() + " " + otp + " " + valid);

        response.put("valid", valid);

        System.out.println("OTP validity: " + valid);
        return ResponseEntity.ok(response);
    }
}
