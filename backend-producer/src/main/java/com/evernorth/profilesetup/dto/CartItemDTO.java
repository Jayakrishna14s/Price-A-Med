package com.evernorth.profilesetup.dto;

import java.util.List;

import com.evernorth.profilesetup.service.database.entity.CartItem;

public class CartItemDTO {
    private List<CartItem> cartItems;

    private double discount;

    public CartItemDTO( List<CartItem> cartItems, double discount ) {
        this.cartItems = cartItems;
        this.discount = discount;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public double getDiscount() {
        return discount;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
    
    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
