package com.evernorth.profilesetup.dto;

public class OtpDTO {
    private String taskID;
    private String type;
    private String email;

    public OtpDTO() {}
    public String getTaskID() {
        return taskID;
    }

    public void setTaskID(String id) {
        this.taskID = id;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
