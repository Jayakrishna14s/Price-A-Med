package com.evernorth.profilesetup.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AdminController {
    
    @GetMapping("/admin")
    public String check() {
        System.out.println("I am admin");
        return "I am admin";
    }
}
 