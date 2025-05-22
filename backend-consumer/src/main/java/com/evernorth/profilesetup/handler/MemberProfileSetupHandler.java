package com.evernorth.profilesetup.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.evernorth.profilesetup.service.database.AllergiesQuery;
import com.evernorth.profilesetup.service.database.BasicInfoQuery;
import com.evernorth.profilesetup.service.database.ContactInfoQuery;
import com.evernorth.profilesetup.service.database.CurrentMedicationsQuery;
import com.evernorth.profilesetup.service.database.HealthConditionsQuery;
import com.evernorth.profilesetup.service.database.DeliveryAddressQuery;
import com.evernorth.profilesetup.service.database.PaymentInfoQuery;
import com.evernorth.profilesetup.service.database.AddDependentQuery;
import com.evernorth.profilesetup.service.database.UpdateDependentQuery;


@Service
public class MemberProfileSetupHandler {
    @Autowired
    private BasicInfoQuery basicInfoQuery;

    @Autowired
    private ContactInfoQuery contactInfoQuery;

    @Autowired
    private CurrentMedicationsQuery currentMedicationsQuery;

    @Autowired
    private HealthConditionsQuery healthConditionsQuery;

    @Autowired
    private AllergiesQuery allergiesQuery;

    @Autowired
    private DeliveryAddressQuery deliveryAddressQuery;

    @Autowired
    private PaymentInfoQuery paymentInfoQuery;

    @Autowired
    private AddDependentQuery addDependentQuery;

    @Autowired
    private UpdateDependentQuery updateDependentQuery;

    private static final Logger LOGGER = LoggerFactory.getLogger(MemberProfileSetupHandler.class);

    public void handle(BasicInfoDTO payload) {
        String memberID = payload.getMemberID();
        String image = payload.getImage();
        String firstName = payload.getFirstName();
        String lastName = payload.getLastName();

        LOGGER.info(memberID + " " + image + " " + firstName + " " + lastName);

        try {
            basicInfoQuery.update(payload);
            LOGGER.info("Successfully Updated");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        } 
    }

    public void handle(ContactInfoDTO payload) {
       
        try {
            contactInfoQuery.update(payload);
            LOGGER.info("Successfully Updated");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }
    }

    public void handle(CurrentMedicationDTO payload) {
       
        try {
            currentMedicationsQuery.update(payload);
            LOGGER.info("Successfully Updated");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }
    }

    public void handle(HealthConditionDTO payload) {
       
        try {
            healthConditionsQuery.update(payload);
            LOGGER.info("Successfully Updated");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }
    }


    public void handle(AllergyDTO payload) {
       
        try {
            allergiesQuery.update(payload);
            LOGGER.info("Successfully Updated");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }
    }

    public void handle(DeliveryAddressDTO payload) {
       
        try {
            deliveryAddressQuery.update(payload);
            LOGGER.info("Successfully Updated");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }
    }


    public void handle(PaymentInfoDTO payload) {
       
        try {
            paymentInfoQuery.update(payload);
            LOGGER.info("Successfully Updated");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }
    }

    public void handle(AddDependentDTO payload) {
       
        try {
            addDependentQuery.update(payload);
            LOGGER.info("Successfully Updated");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }
    }

    public void handle(UpdateDependentDTO payload) {
       
        try {
            updateDependentQuery.update(payload);
            LOGGER.info("Successfully Updated");
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return;
        }
    }
}
 