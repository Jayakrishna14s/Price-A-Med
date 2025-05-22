// package com.evernorth.profilesetup.api.controllers;

// import java.math.BigDecimal;
// import java.math.RoundingMode;
// import java.time.LocalDate;
// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.Date;
// import java.util.HashMap;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.RestController;

// import com.evernorth.profilesetup.service.database.entity.CartItem;
// import com.evernorth.profilesetup.service.database.entity.InsurancePlan;
// import com.evernorth.profilesetup.service.database.entity.OrderItems;
// import com.evernorth.profilesetup.service.database.entity.PharmMedInfo;
// import com.evernorth.profilesetup.service.database.entity.User;
// import com.evernorth.profilesetup.service.database.entity.UserOrders;
// import com.evernorth.profilesetup.service.database.repository.CartItemRepository;
// import com.evernorth.profilesetup.service.database.repository.InsurancePlanRepository;
// import com.evernorth.profilesetup.service.database.repository.OrderItemsRepository;
// import com.evernorth.profilesetup.service.database.repository.UserOrdersRepository;
// import com.evernorth.profilesetup.service.database.repository.UserRepository;
// import com.evernorth.profilesetup.service.jwt.JwtService;

// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletRequest;

// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.GetMapping;



// @RestController
// public class UserOrdersController {

//     @Autowired
//     UserRepository userRepository;
    
//     @Autowired
//     UserOrdersRepository userOrdersRepository;

//     @Autowired
//     OrderItemsRepository orderItemsRepository;

//     @Autowired
//     CartItemRepository cartItemRepository;

//     @Autowired
//     InsurancePlanRepository insurancePlanRepository;

//     @Autowired
//     private JwtService service;

//     @GetMapping("/api/getOrders")
//     public ResponseEntity<List<UserOrders>> getMethodName(HttpServletRequest request) {
//         String token = Arrays.stream(request.getCookies())
//         .filter(cookie -> "jwt".equals(cookie.getName()))
//         .map(Cookie::getValue)
//         .findFirst()
//         .orElse(null);
//         String memberID = service.extractUsername(token);

//         User user = userRepository.findByMemberID(memberID).orElse(null);

//         if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

//         int userID = user.getUserID();

//         return new ResponseEntity<>(userOrdersRepository.findByUserID(userID), HttpStatus.OK);
//     }

//     @GetMapping("/api/getOrderItems")
//     public ResponseEntity<List<OrderItems>> getItems(HttpServletRequest request) {
//         String token = Arrays.stream(request.getCookies())
//         .filter(cookie -> "jwt".equals(cookie.getName()))
//         .map(Cookie::getValue)
//         .findFirst()
//         .orElse(null);
//         String memberID = service.extractUsername(token);

//         User user = userRepository.findByMemberID(memberID).orElse(null);

//         if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

//         int userID = user.getUserID();

//         return new ResponseEntity<>(orderItemsRepository.findOrderItemsByUserID(userID), HttpStatus.OK);


//     }
    
    

    

//     @PostMapping("/api/orders/placeOrder")
//     public ResponseEntity<UserOrders> placeOrder(HttpServletRequest request) {

//         String token = Arrays.stream(request.getCookies())
//         .filter(cookie -> "jwt".equals(cookie.getName()))
//         .map(Cookie::getValue)
//         .findFirst()
//         .orElse(null);
// String memberID = service.extractUsername(token);
//         //TODO: process POST request

//         User user = userRepository.findByMemberID(memberID).orElse(null);

//         if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

//         int userID = user.getUserID();

//         InsurancePlan insurancePlan = insurancePlanRepository.findById((long)1).orElse(null);

//         if ( insurancePlan == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

//         double discount = insurancePlan.getDiscount();
        
//         List<CartItem> cartItems = cartItemRepository.findByUserID(userID);

//         if ( cartItems.size() == 0 ) {
//             return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//         }


//         HashMap<PharmMedInfo, Integer> medQuantity = new HashMap<>();
//         BigDecimal totalPrice = BigDecimal.ZERO;
//         BigDecimal discountMultiplier = BigDecimal.ONE.subtract(BigDecimal.valueOf(discount).divide(BigDecimal.valueOf(100))); // (1 - discount/100)

//         for (CartItem cartItem : cartItems) {
//             medQuantity.put(cartItem.getItem(), cartItem.getQuantity());
//             totalPrice = totalPrice.add(cartItem.getUnitPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
//         }

//         totalPrice = totalPrice.multiply(discountMultiplier).setScale(2, RoundingMode.HALF_UP);
//         UserOrders userOrder = new UserOrders(user, LocalDate.now(), totalPrice, LocalDate.now().plusDays(1), "Pending");

//         UserOrders savedUserOrder = null;

//         try {

//             savedUserOrder = userOrdersRepository.save(userOrder);

//             if (savedUserOrder == null) { 
//                 return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//             }

//             for( PharmMedInfo medication : medQuantity.keySet() ) {
//                 orderItemsRepository.save(
//                     new OrderItems(
//                         medication, savedUserOrder, medQuantity.get(medication)
//                     )
//                 );
//             }

//         } catch(Exception e) {
//             System.out.println(e.getMessage());
//             return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//         }

//         for (CartItem cartItem : cartItems) {
//             cartItemRepository.delete(cartItem);
//         }
        
//         return new ResponseEntity<>(savedUserOrder, HttpStatus.CREATED);
//     }

//     @GetMapping("/api/getOrderItemsByID")
//     public ResponseEntity<List<OrderItems>> getOrderItemsByID(@RequestParam Long orderID) {


//         return new ResponseEntity<>(orderItemsRepository.findOrderItemsByID(orderID), HttpStatus.OK);
//     }
        

// }

package com.evernorth.profilesetup.api.controllers;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.service.database.entity.CartItem;
import com.evernorth.profilesetup.service.database.entity.InsurancePlan;
import com.evernorth.profilesetup.service.database.entity.Member;
import com.evernorth.profilesetup.service.database.entity.OrderItems;
import com.evernorth.profilesetup.service.database.entity.PharmMedInfo;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.entity.UserOrders;
import com.evernorth.profilesetup.service.database.repository.CartItemRepository;
import com.evernorth.profilesetup.service.database.repository.InsurancePlanRepository;
import com.evernorth.profilesetup.service.database.repository.MemberRepository;
import com.evernorth.profilesetup.service.database.repository.OrderItemsRepository;
import com.evernorth.profilesetup.service.database.repository.UserOrdersRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;
import com.evernorth.profilesetup.service.jwt.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class UserOrdersController {

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    UserOrdersRepository userOrdersRepository;

    @Autowired
    OrderItemsRepository orderItemsRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    InsurancePlanRepository insurancePlanRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    private JwtService service;

    @GetMapping("/api/getOrders")
    public ResponseEntity<List<UserOrders>> getMethodName(HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
        .filter(cookie -> "jwt".equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
        String memberID = service.extractUsername(token);

        User user = userRepository.findByMemberID(memberID).orElse(null);

        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        int userID = user.getUserID();

        return new ResponseEntity<>(userOrdersRepository.findByUserID(userID), HttpStatus.OK);
    }

    @GetMapping("/api/getOrderItems")
    public ResponseEntity<List<OrderItems>> getItems(HttpServletRequest request) {
        String token = Arrays.stream(request.getCookies())
        .filter(cookie -> "jwt".equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
        String memberID = service.extractUsername(token);

        User user = userRepository.findByMemberID(memberID).orElse(null);

        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        int userID = user.getUserID();

        return new ResponseEntity<>(orderItemsRepository.findOrderItemsByUserID(userID), HttpStatus.OK);


    }
    
    
@GetMapping("/api/getOrderItemsByID")
public ResponseEntity<List<OrderItems>> getOrderItemsByID(@RequestParam Long orderID) {


    return new ResponseEntity<>(orderItemsRepository.findOrderItemsByID(orderID), HttpStatus.OK);
}

    

    @PostMapping("/api/orders/placeOrder")
    public ResponseEntity<UserOrders> placeOrder(HttpServletRequest request) {

        String token = Arrays.stream(request.getCookies())
        .filter(cookie -> "jwt".equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
String memberID = service.extractUsername(token);

        Member member = memberRepository.findByMemberID(memberID).orElse(null);
        //TODO: process POST request

        User user = userRepository.findByMemberID(memberID).orElse(null);

        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        int userID = user.getUserID();

        InsurancePlan insurancePlan = insurancePlanRepository.findById(member.getInsurancePlan().getId()).orElse(null);

        if ( insurancePlan == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        double discount = insurancePlan.getDiscount();
        
        List<CartItem> cartItems = cartItemRepository.findByUserID(userID);

        if ( cartItems.size() == 0 ) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }


        HashMap<PharmMedInfo, Integer> medQuantity = new HashMap<>();
        BigDecimal totalPrice = BigDecimal.ZERO;
        BigDecimal discountMultiplier = BigDecimal.ONE.subtract(BigDecimal.valueOf(discount).divide(BigDecimal.valueOf(100))); // (1 - discount/100)

        for (CartItem cartItem : cartItems) {
            medQuantity.put(cartItem.getItem(), cartItem.getQuantity());
            totalPrice = totalPrice.add(cartItem.getUnitPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        totalPrice = totalPrice.multiply(discountMultiplier).setScale(2, RoundingMode.HALF_UP);
        UserOrders userOrder = new UserOrders(user, LocalDate.now(), totalPrice, LocalDate.now().plusDays(1), "Pending");

        UserOrders savedUserOrder = null;

        try {

            savedUserOrder = userOrdersRepository.save(userOrder);

            if (savedUserOrder == null) { 
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            for( PharmMedInfo medication : medQuantity.keySet() ) {
                orderItemsRepository.save(
                    new OrderItems(
                        medication, savedUserOrder, medQuantity.get(medication)
                    )
                );
            }

        } catch(Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        for (CartItem cartItem : cartItems) {
            cartItemRepository.delete(cartItem);
        }
        
        return new ResponseEntity<>(savedUserOrder, HttpStatus.CREATED);
    }
    

}
