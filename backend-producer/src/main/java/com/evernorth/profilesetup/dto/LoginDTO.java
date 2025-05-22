package com.evernorth.profilesetup.dto;


public class LoginDTO {

    private String memberID;
    private String password;

    public LoginDTO() {}

    public String getMemberID() {
        return this.memberID;
    }

    public String getUsername() {
        return this.memberID;
    }

    public void setMemberID(String memberID){
        this.memberID = memberID;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}