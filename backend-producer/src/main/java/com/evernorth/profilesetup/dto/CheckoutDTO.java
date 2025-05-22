package com.evernorth.profilesetup.dto;

import java.util.List;

import com.evernorth.profilesetup.service.database.entity.CartItem;
import com.evernorth.profilesetup.service.database.entity.DeliveryAddress;
import com.evernorth.profilesetup.service.database.entity.Dependent;
import com.evernorth.profilesetup.service.database.entity.PaymentInfo;
import com.evernorth.profilesetup.service.database.entity.Prescription;

public class CheckoutDTO {
    
    private List<CartItem> cartItems;

    private List<DeliveryAddress> deliveryAddresses;

    private List<PaymentInfo> paymentInfos;

    private List<Dependent> dependents;

    private List<Prescription> prescriptions;

    private double discount;

    public CheckoutDTO( List<CartItem> cartItems, List<DeliveryAddress> deliveryAddresses, List<PaymentInfo> paymentInfos, List<Dependent> dependents, List<Prescription> prescriptions, double discount ) {
        this.cartItems = cartItems;
        this.deliveryAddresses = deliveryAddresses;
        this.paymentInfos = paymentInfos;
        this.dependents = dependents;
        this.prescriptions = prescriptions;
        this.discount = discount;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public List<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }   
    
    public List<DeliveryAddress> getDeliveryAddresses() {
        return deliveryAddresses;
    }

    public List<Dependent> getDependents() {
        return dependents;
    }

    public List<PaymentInfo> getPaymentInfos() {
        return paymentInfos;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public void setDeliveryAddresses(List<DeliveryAddress> deliveryAddresses) {
        this.deliveryAddresses = deliveryAddresses;
    }

    public void setDependents(List<Dependent> dependents) {
        this.dependents = dependents;
    }

    public void setPaymentInfos(List<PaymentInfo> paymentInfos) {
        this.paymentInfos = paymentInfos;
    }
}