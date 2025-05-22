package com.evernorth.profilesetup.api.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.dto.PrescriptionDTO;
import com.evernorth.profilesetup.dto.PrescriptionMedDTO;
import com.evernorth.profilesetup.service.database.entity.Medication;
import com.evernorth.profilesetup.service.database.entity.Prescription;
import com.evernorth.profilesetup.service.database.entity.PrescriptionMed;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.PrescriptionMedRepository;
import com.evernorth.profilesetup.service.database.repository.PrescriptionRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;
import com.evernorth.profilesetup.service.jwt.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;



@RestController
public class PrescriptionController {
    @Autowired
    PrescriptionRepository prescriptionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PrescriptionMedRepository prescriptionMedRepository;

    @Autowired
    private JwtService service;



    @PostMapping("/api/addPrescription")
    public ResponseEntity<Prescription> addPrescription(HttpServletRequest request, @RequestBody PrescriptionDTO prescriptionDTO) {

                String token = Arrays.stream(request.getCookies())
                .filter(cookie -> "jwt".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
        String memberID = service.extractUsername(token);

        User user = userRepository.findByMemberID(memberID).orElse(null);

        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        Prescription prescription = new Prescription(
            user,
            prescriptionDTO.getStartDate(),
            prescriptionDTO.getEndDate(),
            prescriptionDTO.getHospitalName(),
            prescriptionDTO.getDoctorName(),
            prescriptionDTO.getPrescriptionUrl(),
            prescriptionDTO.getConditionName(),
            ( prescriptionDTO.getDependentID().equals("Self") ? null : prescriptionDTO.getDependentID()  )
        );

        Prescription savedPrescription = prescriptionRepository.save(prescription);

        List<Medication> prescribedMeds = prescriptionDTO.getMedications();

        for( Medication medication : prescribedMeds ) {
            PrescriptionMed prescriptionMed = new PrescriptionMed(prescription, medication);
            prescriptionMedRepository.save(prescriptionMed);
        }


        return new ResponseEntity<>(savedPrescription, HttpStatus.OK);
    }

    @GetMapping("/api/getPrescriptions")
    public ResponseEntity<List<PrescriptionMedDTO>> getPrescriptions(HttpServletRequest request) {

                String token = Arrays.stream(request.getCookies())
                .filter(cookie -> "jwt".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
        String memberId = service.extractUsername(token);
        User user = userRepository.findByMemberID(memberId).orElse(null);

        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        List<Prescription> prescriptions = prescriptionRepository.findPrescriptionsByUserId(user.getUserID());

        List<PrescriptionMedDTO> prescriptionMedDTOs = new ArrayList<>();

        for( Prescription prescription : prescriptions ) {
            List<Medication> medications = prescriptionMedRepository.findMedByPrescription(prescription.getId());

            PrescriptionMedDTO prescriptionMedDTO = new PrescriptionMedDTO(prescription, medications);
            prescriptionMedDTOs.add(prescriptionMedDTO);

        }
        
        return new ResponseEntity<>(prescriptionMedDTOs, HttpStatus.OK);
    }

    @PostMapping("/api/deletePrescription")
    public ResponseEntity<Prescription> deletePrescription(@RequestParam Long prescriptionId, HttpServletRequest request) {

        String token = Arrays.stream(request.getCookies())
        .filter(cookie -> "jwt".equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
        String memberId = service.extractUsername(token);
        //TODO: process POST request
        User user = userRepository.findByMemberID(memberId).orElse(null);
        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        Prescription prescription = prescriptionRepository.findPrescription(user.getUserID(), prescriptionId).orElse(null);

        if ( prescription == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        prescriptionMedRepository.deleteMedsByPrescriptionId(prescription.getId());

        prescriptionRepository.delete(prescription);


        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    
    
    
}
