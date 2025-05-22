package com.evernorth.profilesetup.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.service.database.entity.PharmMedInfo;
import com.evernorth.profilesetup.service.database.repository.PharmacyMedInfoRepository;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class PharmacyMedInfoController {

    @Autowired
    PharmacyMedInfoRepository pharmacyMedInfoRepository;

    

    @GetMapping("/api/getAllMeds")
    public List<PharmMedInfo> getAllMeds() {
        return pharmacyMedInfoRepository.findAll();
    }
    
    
}
