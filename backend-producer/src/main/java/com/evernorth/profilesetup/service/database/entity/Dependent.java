package com.evernorth.profilesetup.service.database.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dependent")
public class Dependent {
    
    @Id
    @Column(name = "dependentID", nullable = false, length = 255)
    private String dependentID;
    
    // @ManyToOne
    @Column(name = "userID", nullable = false)
    private int userID;
    
    @Column(name = "name", nullable = false, length = 255)
    private String dependentName;
    
    @Column(name = "image", nullable = false, length = 255, columnDefinition = "VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dkezdazmt/image/upload/v1735478208/Evernorth/evernorth_logo.png'")
    private String image;


    public String getDependentID() {
        return dependentID;
    }

    public void setDependentID(String dependentID) {
        this.dependentID = dependentID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getDependentName() {
        return dependentName;
    }

    public void setDependentName(String dependentName) {
        this.dependentName = dependentName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
