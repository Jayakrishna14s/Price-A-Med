package com.evernorth.profilesetup.service.database;


import com.evernorth.profilesetup.dto.SignupDTO;
import com.evernorth.profilesetup.service.database.entity.Member;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.MemberRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class SignupQuery {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public void signup(SignupDTO payload) throws Exception {
        User user = new User();
        user.setMemberID(payload.getMemberID());
        user.setEmail(payload.getEmail());
        user.setFirstName(payload.getFirstName());
        user.setLastName(payload.getLastName());
        user.setCountryCode(payload.getCountryCode());
        user.setMobileNumber(payload.getMobileNumber());
        user.setDob(convertStringToDate(payload.getDob()));
        user.setPassword(passwordEncoder.encode(payload.getPassword()));

        userRepository.save(user);
        memberRepository.setActive(payload.getMemberID());
    }

    public Date convertStringToDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

//    public String encrypt(String input) {
//        return "magic";
//    }

}
