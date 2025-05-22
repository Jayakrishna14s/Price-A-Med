package com.evernorth.profilesetup.consumer;

import com.evernorth.profilesetup.handler.SubscribeHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.TopicPartition;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.SubscribeDTO;
import com.evernorth.profilesetup.service.email.EmailService;

@Service
public class SubscribeConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(SubscribeConsumer.class);


    @Autowired
    private SubscribeHandler subscribeHandler;

    @KafkaListener(
        topicPartitions = @TopicPartition(
                topic = "Subscribe",
                partitions = {"0"}
        ),
        groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic0(SubscribeDTO payload) throws Exception{
        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 0 -> %s", payload));
    }

    @KafkaListener(
        topicPartitions = @TopicPartition(
                topic = "Subscribe",
                partitions = {"1"}
        ),
        groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic1(SubscribeDTO payload){
        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 1 -> %s", payload.toString()));
    }

    @KafkaListener(
        topicPartitions = @TopicPartition(
                topic = "Subscribe",
                partitions = {"2"}
        ),
        groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic2(SubscribeDTO payload){

        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 2 -> %s", payload.toString()));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Subscribe",
                    partitions = {"3"}
            ),
            groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic3(SubscribeDTO payload){
        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 3 -> %s", payload.toString()));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Subscribe",
                    partitions = {"4"}
            ),
            groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic4(SubscribeDTO payload){
        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 4 -> %s", payload.toString()));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Subscribe",
                    partitions = {"5"}
            ),
            groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic5(SubscribeDTO payload){
        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 5 -> %s", payload.toString()));
    }


    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Subscribe",
                    partitions = {"6"}
            ),
            groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic6(SubscribeDTO payload){
        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 6 -> %s", payload.toString()));
    }


    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Subscribe",
                    partitions = {"7"}
            ),
            groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic7(SubscribeDTO payload){
        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 7 -> %s", payload.toString()));
    }


    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Subscribe",
                    partitions = {"8"}
            ),
            groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic8(SubscribeDTO payload){
        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 8 -> %s", payload.toString()));
    }


    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Subscribe",
                    partitions = {"9"}
            ),
            groupId = "SubscribeGroup"
    )
    public void consumeFromSubscribeTopic9(SubscribeDTO payload){
        subscribeHandler.handle(payload);
        LOGGER.info(String.format("Message received 9 -> %s", payload.toString()));
    }
}



// 10 consumers listening from same topic.
// Partitions are shared between the consumers.
// each topic has few partitions.
