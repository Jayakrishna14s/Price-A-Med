package com.evernorth.profilesetup.service.redis.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@RedisHash("Otp")
public class Otp implements Serializable {
    @Id
    private String id;
    private String otp;

    public Otp() {}
    public Otp(String id, String otp) {
        this.id = id;
        this.otp = otp;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}










//package com.evernorth.profilesetup.service.redis.entity;
//
//
//import org.springframework.data.redis.core.RedisHash;
//
//import java.io.Serializable;
//
//@RedisHash("Otp")
//public class Otp implements Serializable {   // redis hash keyspace will become "Otp"
//    private String taskID;  // first one is considered "key"
//    private String otp;
//
//    public Otp(String taskID, String otp) {
//        this.taskID = taskID;
//        this.otp = otp;
//    }
//
//    public String getTaskID() {
//        return taskID;
//    }
//
//    public void setTaskID(String taskID) {
//        this.taskID = taskID;
//    }
//
//    public String getOtp() {
//        return otp;
//    }
//
//    public void setOtp(String otp) {
//        this.otp = otp;
//    }
//}
