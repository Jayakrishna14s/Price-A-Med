package com.evernorth.profilesetup.api.controllers;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.dto.CartItemDTO;
import com.evernorth.profilesetup.service.database.entity.CartItem;
import com.evernorth.profilesetup.service.database.entity.InsurancePlan;
import com.evernorth.profilesetup.service.database.entity.PharmMedInfo;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.CartItemRepository;
import com.evernorth.profilesetup.service.database.repository.InsurancePlanRepository;
import com.evernorth.profilesetup.service.database.repository.PharmacyMedInfoRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;
import com.evernorth.profilesetup.service.jwt.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;



@RestController
public class CartItemController {
    
    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PharmacyMedInfoRepository pharmacyMedInfoRepository;

    @Autowired
    InsurancePlanRepository insurancePlanRepository;

    @Autowired
    private JwtService service;

    @GetMapping("/api/getuserCart")
    public ResponseEntity<CartItemDTO> getuserCart(HttpServletRequest request) {

                String token = Arrays.stream(request.getCookies())
                .filter(cookie -> "jwt".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
        String memberId = service.extractUsername(token);
        
        User user = userRepository.findByMemberID(memberId).orElse(null);

        if ( user == null ) return new ResponseEntity(null, HttpStatus.BAD_REQUEST);

        int userID = user.getUserID();

        InsurancePlan insurancePlan = insurancePlanRepository.findById((long)1).orElse(null);

        if ( insurancePlan == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        double discount = insurancePlan.getDiscount();

        CartItemDTO cartItemDTO = new CartItemDTO(cartItemRepository.findByUserID(userID), discount);

        return new ResponseEntity<>(cartItemDTO, HttpStatus.OK) ;
    }

    @GetMapping("/api/getCartMap")
    public ResponseEntity<HashMap<Long, Integer>> getMethodName(HttpServletRequest request) {

        String token = Arrays.stream(request.getCookies())
        .filter(cookie -> "jwt".equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
        String memberId = service.extractUsername(token);

        User user = userRepository.findByMemberID(memberId).orElse(null);

        if ( user == null ) return new ResponseEntity(null, HttpStatus.BAD_REQUEST);

        int userID = user.getUserID();
        List<Object[]> quantities = cartItemRepository.findQuantitiesByUserID(userID);

        HashMap<Long, Integer> map = new HashMap<>();

        for( Object[] quantity : quantities ) {
            map.put(
                (Long)quantity[0],
                (Integer)quantity[1]
            );
        }

        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    

    @GetMapping("/api/findItemIds")
    public List<Long> findItemIds(HttpServletRequest request) {

        String token = Arrays.stream(request.getCookies())
        .filter(cookie -> "jwt".equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
        String memberID = service.extractUsername(token);



        User user = userRepository.findByMemberID(memberID).orElse(null);
        int userID = user.getUserID();
        return cartItemRepository.findItemIdsByUserID(userID);
    }

    @PostMapping("/api/addToCart")
    public ResponseEntity<CartItem> addToCart(HttpServletRequest request, @RequestParam Long itemID) {
        //TODO: process POST request

        String token = Arrays.stream(request.getCookies())
        .filter(cookie -> "jwt".equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
        String memberID = service.extractUsername(token);



        User user = userRepository.findByMemberID(memberID).orElse(null);

        PharmMedInfo item = pharmacyMedInfoRepository.findById(itemID).orElse(null);

        if ( user == null || item == null ) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        CartItem cartItem = new CartItem(item, user, item.getUnitPrice(), 1);

        CartItem savedCartItem = cartItemRepository.save(cartItem);

        return new ResponseEntity<>(savedCartItem, HttpStatus.CREATED);
    }

    @PostMapping("/api/updateCartQuantity")
    public ResponseEntity<CartItem> updateCartQuantity(@RequestParam Long itemID, @RequestParam Character operation, HttpServletRequest request) {

        String token = Arrays.stream(request.getCookies())
        .filter(cookie -> "jwt".equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
        String memberID = service.extractUsername(token);

        if ( operation != '+' && operation != '-' ) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        User user = userRepository.findByMemberID(memberID).orElse(null);

        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        int userID = user.getUserID();

        CartItem cartItem = cartItemRepository.findByUserIDAndItemID(userID, itemID).orElse(null);

        if ( cartItem == null ) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        if ( operation == '+' ) {
            cartItem.setQuantity( cartItem.getQuantity() + 1 );
        } else {
            cartItem.setQuantity( cartItem.getQuantity() - 1 );
        }
        CartItem savedCartItem = null;
        if ( cartItem.getQuantity() != 0 )
            savedCartItem = cartItemRepository.save(cartItem);
        else {
            cartItemRepository.delete(cartItem);
        }
        

        return new ResponseEntity<>(savedCartItem, HttpStatus.OK);
    }
    

    @PostMapping("/api/removeItem")
    public ResponseEntity<CartItem> postMethodName( @RequestParam Long itemID, HttpServletRequest request) {

        String token = Arrays.stream(request.getCookies())
        .filter(cookie -> "jwt".equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
String memberID = service.extractUsername(token);
        //TODO: process POST request
        User user = userRepository.findByMemberID(memberID).orElse(null);

        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        
        int userID = user.getUserID();

        CartItem cartItem = cartItemRepository.findByUserIDAndItemID(userID, itemID).orElse(null);
        
        cartItemRepository.delete(cartItem);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    
    
    
    

}
