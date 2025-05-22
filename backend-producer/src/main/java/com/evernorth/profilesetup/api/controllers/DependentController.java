package com.evernorth.profilesetup.api.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.service.database.entity.Dependent;
import com.evernorth.profilesetup.service.database.entity.Member;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.DependentRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;
import com.evernorth.profilesetup.service.jwt.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class DependentController {
    

    @Autowired
    DependentRepository dependentRepository;

        @Autowired
    UserRepository userRepository;

    
    @Autowired
    private JwtService service;

    @GetMapping("/api/getDependents")
    public ResponseEntity<List<Dependent>> getMethodName(HttpServletRequest request) {
                String token = Arrays.stream(request.getCookies())
                .filter(cookie -> "jwt".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
        String memberID = service.extractUsername(token);

        User user = userRepository.findByMemberID(memberID).orElse(null);

        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        int userID = user.getUserID();

        return new ResponseEntity<>(dependentRepository.findByUserID(userID), HttpStatus.OK);
    }
    
}
