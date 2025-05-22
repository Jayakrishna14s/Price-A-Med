//package com.evernorth.profilesetup.kafka.subscribe;
//
//import org.apache.kafka.clients.admin.NewTopic;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.config.TopicBuilder;
//
//@Configuration
//public class SubscribeFeedbackTopicConfig {
//    @Bean
//    public NewTopic topic() {
//        return TopicBuilder.name("SubscribeFeedback")
//                .partitions(10)
//                .replicas(1)
//                .build();
//    }
//}
