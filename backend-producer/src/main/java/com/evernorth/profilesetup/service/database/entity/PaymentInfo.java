package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.*;

@Entity
public class PaymentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cardID;

    @Column(nullable = false)
    private int userID;

    @Column
    private String cardHolderName;

    @Column
    private String cardNumber; // Fixed the field name (was cardHolderNumber)

    @Column
    private String expirationDate;

    @Column
    private String cvv;

    // Default Constructor
    public PaymentInfo() {}

    // Parameterized Constructor
    public PaymentInfo(int userID, String cardHolderName, String cardNumber, String expirationDate, String cvv) {
        this.userID = userID;
        this.cardHolderName = cardHolderName;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
    }

    // Getters and Setters
    public Integer getCardID() {
        return cardID;
    }

    public void setCardID(Integer cardID) {
        this.cardID = cardID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }
}