package com.evernorth.profilesetup.consumer;


import com.evernorth.profilesetup.dto.OtpDTO;
import com.evernorth.profilesetup.handler.OtpHandler;
import com.evernorth.profilesetup.service.email.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.TopicPartition;
import org.springframework.stereotype.Service;

@Service
public class OtpConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(SubscribeConsumer.class);

    @Autowired
    private OtpHandler otpHandler;

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"0"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic0(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 0 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"1"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic1(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 1 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"2"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic2(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 2 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"3"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic3(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 3 -> %s", payload));
    }
    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"4"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic4(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 4 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"5"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic5(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 5 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"6"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic6(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 6 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"7"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic7(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 7 -> %s", payload));
    }


    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"8"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic8(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 8 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "Otp",
                    partitions = {"9"}
            ),
            groupId = "OtpGroup"
    )
    public void consumeFromOtpTopic9(OtpDTO payload) throws Exception{
        otpHandler.handle(payload);
        LOGGER.info(String.format("Message received 9 -> %s", payload));
    }


}
