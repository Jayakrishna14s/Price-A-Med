package com.evernorth.profilesetup.consumer;

import com.evernorth.profilesetup.dto.SignupDTO;
import com.evernorth.profilesetup.handler.SignupHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.TopicPartition;
import org.springframework.stereotype.Service;

@Service
public class SignupConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(SubscribeConsumer.class);

    @Autowired
    private SignupHandler signupHandler;


    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"0"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic0(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
        LOGGER.info(payload.toString());

        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());


        LOGGER.info(String.format("Message received 0 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"1"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic1(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
        LOGGER.info(payload.toString());

        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());


        LOGGER.info(String.format("Message received 1 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"2"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic2(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
        LOGGER.info(payload.toString());
        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());


        LOGGER.info(String.format("Message received 2 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"3"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic3(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
        LOGGER.info(payload.toString());
        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());


        LOGGER.info(String.format("Message received 3 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"4"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic4(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
        LOGGER.info(payload.toString());
        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());


        LOGGER.info(String.format("Message received 4 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"5"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic5(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
        LOGGER.info(payload.toString());
        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());


        LOGGER.info(String.format("Message received 5 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"6"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic6(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
//        LOGGER.info(payload.toString());

        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());


        LOGGER.info(String.format("Message received 6 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"7"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic7(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
//        LOGGER.info(payload.toString());
        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());

        LOGGER.info(String.format("Message received 7 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"8"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic8(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());
        LOGGER.info(String.format("Message received 8 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic="Signup",
                    partitions = {"9"}
            ),
            groupId = "SignupGroup"
    )
    public void consumeFromSignupTopic9(SignupDTO payload) throws Exception {
        signupHandler.handle(payload);
        LOGGER.info(payload.toString());
        LOGGER.info(payload.getEmail() + " " + payload.getPassword() + " " + payload.getDob());

        LOGGER.info(String.format("Message received 9 -> %s", payload));
    }
}
