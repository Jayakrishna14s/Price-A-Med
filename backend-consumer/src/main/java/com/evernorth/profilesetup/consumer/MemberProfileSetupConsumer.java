package com.evernorth.profilesetup.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.TopicPartition;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.AddDependentDTO;
import com.evernorth.profilesetup.dto.AllergyDTO;
import com.evernorth.profilesetup.dto.BasicInfoDTO;
import com.evernorth.profilesetup.dto.ContactInfoDTO;
import com.evernorth.profilesetup.dto.CurrentMedicationDTO;
import com.evernorth.profilesetup.dto.DeliveryAddressDTO;
import com.evernorth.profilesetup.dto.HealthConditionDTO;
import com.evernorth.profilesetup.dto.PaymentInfoDTO;
import com.evernorth.profilesetup.dto.UpdateDependentDTO;
import com.evernorth.profilesetup.handler.MemberProfileSetupHandler;

@Service
public class MemberProfileSetupConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(MemberProfileSetupConsumer.class);

    @Autowired
    private MemberProfileSetupHandler memberProfileSetupHandler;

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "MemberProfileSetup",
                    partitions = {"0"}
            ),
            groupId = "MemberProfileSetupGroup"
    )
    public void consumeFromMPSTopic0(BasicInfoDTO payload) throws Exception{
        memberProfileSetupHandler.handle(payload);
        LOGGER.info(String.format("Message received 0 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "MemberProfileSetup",
                    partitions = {"1"}
            ),
            groupId = "MemberProfileSetupGroup"
    )
    public void consumeFromMPSTopic1(ContactInfoDTO payload) throws Exception{
        memberProfileSetupHandler.handle(payload);
        LOGGER.info(String.format("Message received 1 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "MemberProfileSetup",
                    partitions = {"2"}
            ),
            groupId = "MemberProfileSetupGroup"
    )
    public void consumeFromMPSTopic2(CurrentMedicationDTO payload) throws Exception{
        memberProfileSetupHandler.handle(payload);
        LOGGER.info(String.format("Message received 2 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "MemberProfileSetup",
                    partitions = {"3"}
            ),
            groupId = "MemberProfileSetupGroup"
    )
    public void consumeFromMPSTopic3(HealthConditionDTO payload) throws Exception{
        memberProfileSetupHandler.handle(payload);
        LOGGER.info(String.format("Message received 3 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "MemberProfileSetup",
                    partitions = {"4"}
            ),
            groupId = "MemberProfileSetupGroup"
    )
    public void consumeFromMPSTopic4(AllergyDTO payload) throws Exception{
        memberProfileSetupHandler.handle(payload);
        LOGGER.info(String.format("Message received 4 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "MemberProfileSetup",
                    partitions = {"5"}
            ),
            groupId = "MemberProfileSetupGroup"
    )
    public void consumeFromMPSTopic5(DeliveryAddressDTO payload) throws Exception{
        memberProfileSetupHandler.handle(payload);
        LOGGER.info(String.format("Message received 5 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "MemberProfileSetup",
                    partitions = {"6"}
            ),
            groupId = "MemberProfileSetupGroup"
    )
    public void consumeFromMPSTopic6(PaymentInfoDTO payload) throws Exception{
        memberProfileSetupHandler.handle(payload);
        LOGGER.info(String.format("Message received 6 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "MemberProfileSetup",
                    partitions = {"7"}
            ),
            groupId = "MemberProfileSetupGroup"
    )
    public void consumeFromMPSTopic7(AddDependentDTO payload) throws Exception{
        memberProfileSetupHandler.handle(payload);
        LOGGER.info(String.format("Message received 7 -> %s", payload));
    }

    @KafkaListener(
            topicPartitions = @TopicPartition(
                    topic = "MemberProfileSetup",
                    partitions = {"8"}
            ),
            groupId = "MemberProfileSetupGroup"
    )
    public void consumeFromMPSTopic8(UpdateDependentDTO payload) throws Exception{
        memberProfileSetupHandler.handle(payload);
        LOGGER.info(String.format("Message received 8 -> %s", payload));
    }
}
 