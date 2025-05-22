package com.evernorth.profilesetup.dto;

public class SubscribeDTO {
    private String taskID;
    private String type;
    private String email;

    public SubscribeDTO() {}

    public String getTaskID() {
        return taskID;
    }

    public String getType() {return  type;}

    public String getEmail() {
        return email;
    }

    public void setTaskID(String taskID){
        this.taskID = taskID;
    }

    public void setType(String type){this.type = type;}

    public void setEmail(String email) {
        this.email = email;
    }
}
