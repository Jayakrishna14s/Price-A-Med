package com.evernorth.profilesetup.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class Check {
    @GetMapping
    public String check(){
        return "I am alive";
    }    
}
