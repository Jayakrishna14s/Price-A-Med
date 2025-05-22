// package com.evernorth.profilesetup.api.controllers;

// import org.springframework.web.bind.annotation.RestController;

// import com.evernorth.profilesetup.dto.CheckoutDTO;
// import com.evernorth.profilesetup.service.database.entity.CartItem;
// import com.evernorth.profilesetup.service.database.entity.DeliveryAddress;
// import com.evernorth.profilesetup.service.database.entity.Dependent;
// import com.evernorth.profilesetup.service.database.entity.InsurancePlan;
// import com.evernorth.profilesetup.service.database.entity.Member;
// import com.evernorth.profilesetup.service.database.entity.PaymentInfo;
// import com.evernorth.profilesetup.service.database.entity.Prescription;
// import com.evernorth.profilesetup.service.database.entity.User;
// import com.evernorth.profilesetup.service.database.repository.CartItemRepository;
// import com.evernorth.profilesetup.service.database.repository.DeliveryAddressRepository;
// import com.evernorth.profilesetup.service.database.repository.DependentRepository;
// import com.evernorth.profilesetup.service.database.repository.InsurancePlanRepository;
// import com.evernorth.profilesetup.service.database.repository.MemberRepository;
// import com.evernorth.profilesetup.service.database.repository.PaymentInfoRepository;
// import com.evernorth.profilesetup.service.database.repository.PrescriptionRepository;
// import com.evernorth.profilesetup.service.database.repository.UserRepository;
// import com.evernorth.profilesetup.service.jwt.JwtService;

// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletRequest;
 
// import java.util.Arrays;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;


// @RestController
// public class CheckoutController {

//     @Autowired
//     MemberRepository memberRepository;

//     @Autowired
//     UserRepository userRepository;

//     @Autowired
//     CartItemRepository cartItemRepository;

//     @Autowired
//     DependentRepository dependentRepository;

//     @Autowired
//     DeliveryAddressRepository deliveryAddressRepository;

//     @Autowired
//     PaymentInfoRepository paymentInfoRepository;

//     @Autowired
//     PrescriptionRepository prescriptionRepository;

//     @Autowired
//     InsurancePlanRepository insurancePlanRepository;

//     @Autowired
//     private JwtService service;

//     @GetMapping("/api/getCheckout")
//     public ResponseEntity<CheckoutDTO> getMethodName(HttpServletRequest request) {

//                         String token = Arrays.stream(request.getCookies())
//                 .filter(cookie -> "jwt".equals(cookie.getName()))
//                 .map(Cookie::getValue)
//                 .findFirst()
//                 .orElse(null);
//         String memberId = service.extractUsername(token);

//         Member member = memberRepository.findByMemberID(memberId).orElse(null);
        
//         User user = userRepository.findByMemberID(memberId).orElse(null);

//         if ( user == null ) return new ResponseEntity(null, HttpStatus.BAD_REQUEST);

//         int userID = user.getUserID();

//         InsurancePlan insurancePlan = insurancePlanRepository.findById(member.getInsurancePlan().getId()).orElse(null);

//         if ( insurancePlan == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

//         double discount = insurancePlan.getDiscount();

//         List<PaymentInfo> paymentInfo = paymentInfoRepository.findByUserID(userID);
//         List<DeliveryAddress> deliveryAddresses = deliveryAddressRepository.findByUserID(userID);
//         List<Dependent> dependents = dependentRepository.findByUserID(userID);
//         List<CartItem> cartItems = cartItemRepository.findByUserID(userID);
//         List<Prescription> prescriptions = prescriptionRepository.findPrescriptionsByUserId(userID);


//         return new ResponseEntity<>(new CheckoutDTO(cartItems, deliveryAddresses, paymentInfo, dependents, prescriptions, discount), HttpStatus.OK);
//     }
    
// }


package com.evernorth.profilesetup.api.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.dto.CheckoutDTO;
import com.evernorth.profilesetup.service.database.entity.CartItem;
import com.evernorth.profilesetup.service.database.entity.DeliveryAddress;
import com.evernorth.profilesetup.service.database.entity.Dependent;
import com.evernorth.profilesetup.service.database.entity.InsurancePlan;
import com.evernorth.profilesetup.service.database.entity.Member;
import com.evernorth.profilesetup.service.database.entity.PaymentInfo;
import com.evernorth.profilesetup.service.database.entity.Prescription;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.CartItemRepository;
import com.evernorth.profilesetup.service.database.repository.DeliveryAddressRepository;
import com.evernorth.profilesetup.service.database.repository.DependentRepository;
import com.evernorth.profilesetup.service.database.repository.InsurancePlanRepository;
import com.evernorth.profilesetup.service.database.repository.MemberRepository;
import com.evernorth.profilesetup.service.database.repository.PaymentInfoRepository;
import com.evernorth.profilesetup.service.database.repository.PrescriptionRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;
import com.evernorth.profilesetup.service.jwt.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CheckoutController {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    DependentRepository dependentRepository;

    @Autowired
    DeliveryAddressRepository deliveryAddressRepository;

    @Autowired
    PaymentInfoRepository paymentInfoRepository;

    @Autowired
    PrescriptionRepository prescriptionRepository;

    @Autowired
    InsurancePlanRepository insurancePlanRepository;

    @Autowired
    private JwtService service;

    @GetMapping("/api/getCheckout")
    public ResponseEntity<CheckoutDTO> getMethodName(HttpServletRequest request) {

                        String token = Arrays.stream(request.getCookies())
                .filter(cookie -> "jwt".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
        String memberId = service.extractUsername(token);

        Member member = memberRepository.findByMemberID(memberId).orElse(null);
        
        User user = userRepository.findByMemberID(memberId).orElse(null);

        if ( user == null ) return new ResponseEntity(null, HttpStatus.BAD_REQUEST);

        int userID = user.getUserID();

        InsurancePlan insurancePlan = insurancePlanRepository.findById(member.getInsurancePlan().getId()).orElse(null);

        if ( insurancePlan == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        double discount = insurancePlan.getDiscount();

        List<PaymentInfo> paymentInfo = paymentInfoRepository.findByUserID(userID);
        List<DeliveryAddress> deliveryAddresses = deliveryAddressRepository.findByUserID(userID);
        List<Dependent> dependents = dependentRepository.findByUserID(userID);
        List<CartItem> cartItems = cartItemRepository.findByUserID(userID);
        List<Prescription> prescriptions = prescriptionRepository.findPrescriptionsByUserId(userID);


        return new ResponseEntity<>(new CheckoutDTO(cartItems, deliveryAddresses, paymentInfo, dependents, prescriptions, discount), HttpStatus.OK);
    }
    
}
