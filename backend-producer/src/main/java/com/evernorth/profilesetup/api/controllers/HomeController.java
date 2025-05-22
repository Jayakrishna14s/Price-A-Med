package com.evernorth.profilesetup.api.controllers;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.evernorth.profilesetup.dto.HomeDTO;
import com.evernorth.profilesetup.dto.MedDTO;
import com.evernorth.profilesetup.service.database.entity.InsurancePlan;
import com.evernorth.profilesetup.service.database.entity.Medication;
import com.evernorth.profilesetup.service.database.entity.Member;
import com.evernorth.profilesetup.service.database.entity.PharmMedInfo;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.CartItemRepository;
import com.evernorth.profilesetup.service.database.repository.InsurancePlanRepository;
import com.evernorth.profilesetup.service.database.repository.MedicationRepository;
import com.evernorth.profilesetup.service.database.repository.MemberRepository;
import com.evernorth.profilesetup.service.database.repository.PharmacyMedInfoRepository;
import com.evernorth.profilesetup.service.database.repository.PrescriptionMedRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;
import com.evernorth.profilesetup.service.jwt.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.apache.commons.text.similarity.FuzzyScore;
import java.util.Locale;
import java.util.stream.Collectors;


@RestController
public class HomeController {

    
    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    PharmacyMedInfoRepository pharmacyMedInfoRepository;

    @Autowired
    MedicationRepository medicationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    InsurancePlanRepository insurancePlanRepository;

    @Autowired
    PrescriptionMedRepository prescriptionMedRepository;


    @Autowired
    private JwtService service;


    @GetMapping("/api/home/getHome")
    public ResponseEntity<HomeDTO> getHome(HttpServletRequest request, @RequestParam Long prescriptionID) {

        String token = Arrays.stream(request.getCookies())
                .filter(cookie -> "jwt".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
        String memberID = service.extractUsername(token);

        Member member = memberRepository.findByMemberID(memberID).orElse(null);

        if ( member == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        User user = userRepository.findByMemberID(memberID).orElse(null);

        if ( user == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        int userID = user.getUserID();

        //member.getInsurancePlan().getId()

        InsurancePlan insurancePlan = insurancePlanRepository.findById((long)1).orElse(null);

        if ( insurancePlan == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        double discount = insurancePlan.getDiscount();

        List<PharmMedInfo> pharmMedInfos = pharmacyMedInfoRepository.findAll();

        if ( prescriptionID != null && prescriptionID != (long)-1 ) {
            List<Medication> medications = prescriptionMedRepository.findMedByPrescription(prescriptionID);
            List<Medication> allMeds = medicationRepository.findAll();

            HashSet<Long> set = new HashSet<>();

            for( Medication medication : medications ) {
                set.add(medication.getId());
            }

            for( Medication medication : allMeds ) {
                if ( !set.contains(medication.getId()) ) {
                    if ( medication.getType() == Medication.Type.GENERIC ) {
                        List<Long> alts = medicationRepository.findBrandedAlternatives(medication.getId());
                        for( Long id : alts ) {

                            if ( set.contains(id) ) {
                                set.add(medication.getId());
                            }
                        }
                    } else {
                        List<Long> alts = medicationRepository.findGenericAlternatives(medication.getId());
                        for( Long id : alts ) {
                            if ( set.contains(id) ) {
                                set.add(medication.getId());
                            }
                        }
                    }
                }
            }

            pharmMedInfos.removeIf(medication -> !set.contains(medication.getMedication().getId()));
        }

        List<Object[]> quantities = cartItemRepository.findQuantitiesByUserID(userID);

        HashMap<Long, Integer> map = new HashMap<>();

        for( Object[] quantity : quantities ) {
            map.put(
                (Long)quantity[0],
                (Integer)quantity[1]
            );
        }

        HomeDTO homeDTO = new HomeDTO(pharmMedInfos, map, discount);

        return new ResponseEntity<>(homeDTO, HttpStatus.OK);

    }

    

    

    @GetMapping("/api/home/search")
    public List<Medication> searchMeds(@RequestParam String query, @RequestParam Long prescriptionID) {
        FuzzyScore fuzzyScore = new FuzzyScore(Locale.ENGLISH);

        List<Medication> allMeds = medicationRepository.findAll();


        if ( prescriptionID != null && prescriptionID != (long)-1 ) {
            List<Medication> medications = prescriptionMedRepository.findMedByPrescription(prescriptionID);

            HashSet<Long> set = new HashSet<>();

            for( Medication medication : medications ) {
                set.add(medication.getId());
            }

            allMeds.removeIf(medication -> !set.contains(medication.getId()));
        }

        return allMeds.stream()
            .filter(med -> fuzzyScore.fuzzyScore(med.getName(), query) >= 3)
            .collect(Collectors.toList());
    }

    @GetMapping("/api/home/detailedSearch")
    public ResponseEntity<MedDTO> detailedSearch(@RequestParam Long medId) {

        List<PharmMedInfo> meds = pharmacyMedInfoRepository.findMedicationById(medId);

        List<PharmMedInfo> altMeds;

        if ( meds.get(0).getMedication().getType() == Medication.Type.GENERIC ) {
            altMeds = pharmacyMedInfoRepository.findBrandedAlternatives(medId);
        } else {
            altMeds = pharmacyMedInfoRepository.findGenericAlternatives(medId);
        }

        MedDTO medDto = new MedDTO(meds, altMeds);


        return new ResponseEntity<>(medDto, HttpStatus.OK);
    }
    

    @GetMapping("/api/home/FilterType")
    public ResponseEntity<List<PharmMedInfo>> getMethodName(@RequestParam Medication.Type type) {

        return new ResponseEntity<>( pharmacyMedInfoRepository.findMedicationByType(type), HttpStatus.OK );

    }
    
    
    

}
