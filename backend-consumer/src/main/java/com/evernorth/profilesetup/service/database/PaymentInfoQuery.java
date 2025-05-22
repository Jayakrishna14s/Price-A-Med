package com.evernorth.profilesetup.service.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evernorth.profilesetup.dto.PaymentInfoDTO;
import com.evernorth.profilesetup.service.database.entity.PaymentInfo;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.PaymentInfoRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;

@Service
public class PaymentInfoQuery {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentInfoRepository paymentInfoRepository;

    public void update(PaymentInfoDTO payload) throws Exception {
        User user = userRepository.findByMemberID(payload.getMemberID());
        if (user == null) {
            throw new Exception("User not found with memberID: " + payload.getMemberID());
        }
        Integer userID = user.getUserID();

        PaymentInfo paymentInfo = new PaymentInfo(
            userID,
            payload.getCardHolderName(),
            payload.getCardNumber(),
            payload.getExpirationDate(),
            payload.getCvv()
        );

        paymentInfoRepository.save(paymentInfo);
    }
}
