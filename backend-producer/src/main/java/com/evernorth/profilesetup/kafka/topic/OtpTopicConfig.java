package com.evernorth.profilesetup.kafka.topic;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class OtpTopicConfig {
    @Bean
    public NewTopic otpTopic() {
        return TopicBuilder.name("Otp")
                .partitions(10)
                .replicas(1)
                .build();
    }
    
}
