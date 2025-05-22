package com.evernorth.profilesetup.dto;


public class SignupDTO {
    private String memberID;
    private String email;
    private String firstName;
    private String lastName;
    private String countryCode;
    private String mobileNumber;
    private String dob;
    private String password;


    public SignupDTO() {}

    public String getMemberID() {
        return this.memberID;
    }

    public void  setMemberID(String memberID) {
        this.memberID = memberID;
    }

    public String getEmail() {
        return this.email;
    }

    public void  setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void  setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void  setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCountryCode() {
        return this.countryCode;
    }

    public void  setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getMobileNumber() {
        return this.mobileNumber;
    }

    public void  setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getDob() {
        return this.dob;
    }

    public void  setDob(String dob) {
        this.dob = dob;
    }

    public String getPassword() {
        return this.password;
    }

    public void  setPassword(String password) {
        this.password = password;
    }

}
