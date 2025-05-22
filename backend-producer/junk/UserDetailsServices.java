package com.evernorth.profilesetup.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;


@Configuration
@EnableWebSecurity

public class UserDetailsServices {
    @Bean
    public UserDetailsService users() {
        UserDetails admin = User.builder()
                                .username("admin")
                                .password("password")
                                .roles("ADMIN")
                                .build();
        UserDetails user  = User.builder()
                                .username("user")
                                .password("password")
                                .roles("USER")
                                .build();
        return new InMemoryUserDetailsManager(admin, user);
    }
}
