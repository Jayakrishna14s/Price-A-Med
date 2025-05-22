package com.evernorth.profilesetup.service.database;

import com.evernorth.profilesetup.service.database.entity.InsurancePlan;
import com.evernorth.profilesetup.service.database.entity.Member;
import com.evernorth.profilesetup.service.database.repository.InsurancePlanRepository;
import com.evernorth.profilesetup.service.database.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
public class SubscribeQuery {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    InsurancePlanRepository insurancePlanRepository;

    public String subscribe(String email) throws Exception{

        Optional<Member> existingMember = memberRepository.findByEmail(email);
        if(existingMember.isPresent()) {
            return existingMember.get().getMemberID();
        }

        Member member = new Member();
        member.setEmail(email);
        String memberID = "ENM$" + generateRandomMemberID();
        member.setMemberID(memberID);

        Long insuranceId = (long) ((Math.random() * 3) + 1);

        InsurancePlan insurancePlan = insurancePlanRepository.findById(insuranceId).orElse(null);

        member.setInsurancePlan(insurancePlan);

        memberRepository.save(member);
        return memberID;
    }

    public String generateRandomMemberID() {
        final String ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        final int STRING_LENGTH = 32;
        final int RANDOM_INDICES = 8;

        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < STRING_LENGTH; i++) {
            sb.append(ALPHANUMERIC.charAt(random.nextInt(ALPHANUMERIC.length())));
        }

        StringBuilder memberID = new StringBuilder();
        for (int i = 0; i < RANDOM_INDICES; i++) {
            memberID.append(sb.charAt(random.nextInt(STRING_LENGTH)));
        }

        return memberID.toString();
    }
}

