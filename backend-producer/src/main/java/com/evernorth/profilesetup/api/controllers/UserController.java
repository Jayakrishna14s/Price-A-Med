package com.evernorth.profilesetup.api.controllers;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.evernorth.profilesetup.service.database.entity.Address;
import com.evernorth.profilesetup.service.database.entity.User;
import com.evernorth.profilesetup.service.database.repository.AddressRepository;
import com.evernorth.profilesetup.service.database.repository.AllergiesListRepository;
import com.evernorth.profilesetup.service.database.repository.AllergiesRepository;
import com.evernorth.profilesetup.service.database.repository.CurrentMedicationsRepository;
import com.evernorth.profilesetup.service.database.repository.DeliveryAddressRepository;
import com.evernorth.profilesetup.service.database.repository.DependentAllergyRepository;
import com.evernorth.profilesetup.service.database.repository.DependentHealthConditionRepository;
import com.evernorth.profilesetup.service.database.repository.DependentMedicationRepository;
import com.evernorth.profilesetup.service.database.repository.DependentRepository;
import com.evernorth.profilesetup.service.database.repository.HealthConditionsListRepository;
import com.evernorth.profilesetup.service.database.repository.HealthConditionsRepository;
import com.evernorth.profilesetup.service.database.repository.MedicationRepository;
import com.evernorth.profilesetup.service.database.repository.PaymentInfoRepository;
import com.evernorth.profilesetup.service.database.repository.UserRepository;
import com.evernorth.profilesetup.service.jwt.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired 
    private CurrentMedicationsRepository currentMedicationsRepository;

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private HealthConditionsRepository healthConditionsRepository;

    @Autowired
    private HealthConditionsListRepository healthConditionsListRepository;

    @Autowired
    private AllergiesRepository allergiesRepository;

    @Autowired
    private AllergiesListRepository allergiesListRepository;

    @Autowired
    private DeliveryAddressRepository deliveryAddressRepository;

    @Autowired
    private PaymentInfoRepository paymentInfoRepository;

    @Autowired
    private DependentRepository dependentRepository;

    @Autowired
    private DependentHealthConditionRepository dependentHealthConditionRepository;

    @Autowired
    private HealthConditionsListRepository healthConditionsListRepository2;

    @Autowired
    private DependentAllergyRepository dependentAllergyRepository;

    @Autowired
    private DependentMedicationRepository dependentMedicationRepository;



    @Autowired
    private JwtService service;

   
    @GetMapping 
    public String check() {
        System.out.println("I am user");
        return "I am user";
    }

    @GetMapping("/getProfileData")
    public ResponseEntity<Map<String, Object>> ProfileInfo(HttpServletRequest request){
        

        Map<String, Object> response = new HashMap<>();
        String token = Arrays.stream(request.getCookies())
                       .filter(cookie -> "jwt".equals(cookie.getName()))
                       .map(Cookie::getValue)
                       .findFirst()
                       .orElse(null);
        String memberID = service.extractUsername(token);

        User user = userRepository.findByMemberID(memberID).get();
        Address address = addressRepository.findByUserID(user.getUserID());

        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("memberID", user.getMemberID());
        response.put("image", user.getImage());
        response.put("mobileNumber", user.getMobileNumber());
        response.put("countryCode", user.getCountryCode());
        // response.put("mobileNumber", user.getMobileNumber());
        response.put("email", user.getEmail()); 
        response.put("dob", user.getDob());
        response.put("percentage", user.getPercentage());

        if(address != null) {

        response.put("houseNumber", address.getHouseNo());
        response.put("landmark", address.getLandmark());
        response.put("country", address.getCountry());
        response.put("state", address.getState());
        response.put("city", address.getCity());
        response.put("postalCode", address.getPostalCode());
        }

        List<CurrentMedication> currentMedications = currentMedicationsRepository.findByUserID(user.getUserID())
                                            .stream()
                                            .map(med -> new CurrentMedication(
                                                med.getMedicationID(),
                                                medicationRepository.findById(med.getMedicationID()).getName()  
                                            ))
                                            .collect(Collectors.toList());

        response.put("currentMedications", currentMedications);

        List<HealthCondition> healthConditions = healthConditionsRepository.findByUserID(user.getUserID())
                                                 .stream()
                                                 .map(condition -> new HealthCondition(
                                                    condition.getConditionID(), 
                                                    healthConditionsListRepository.findByConditionID(condition.getConditionID()).getName()
                                                ))
                                                .collect(Collectors.toList());
        response.put("healthConditions", healthConditions);


        List<CurrentAllergy> currentAllergies = allergiesRepository.findByUserID(user.getUserID())
                                                .stream()
                                                .map(allergy -> new CurrentAllergy(
                                                    allergy.getAllergyID(), 
                                                    allergiesListRepository.findByAllergyID(allergy.getAllergyID()).getName()
                                                ))
                                                .collect(Collectors.toList());
        response.put("currentAllergies", currentAllergies);

        List<Delivery_Address> addresses = deliveryAddressRepository.findByUserID(user.getUserID())
                                          .stream()
                                          .map(x -> new Delivery_Address(
                                                x.getAddressID(),
                                                x.getHouseNo(),
                                                x.getLandmark(),
                                                x.getCity(),
                                                x.getState(),
                                                x.getCountry(),
                                                x.getPostalCode()
                                          ))
                                          .collect(Collectors.toList());
        response.put("addresses", addresses);


        List<Payment_Info> cards = paymentInfoRepository.findByUserID(user.getUserID())
                                   .stream()
                                   .map(card -> new Payment_Info(
                                        card.getCardID(),
                                        card.getCardHolderName(),
                                        card.getCardNumber(),
                                        card.getExpirationDate(),
                                        card.getCvv()
                                   ))
                                   .collect(Collectors.toList());

        response.put("cards", cards);


        List<Dependent_Profile> dependents =  dependentRepository.findByUserID(user.getUserID())
                                              .stream()
                                              .map(dependent -> new Dependent_Profile(
                                                    dependent.getDependentID(),
                                                    dependent.getDependentName(),
                                                    dependent.getImage(),
                                                    dependentHealthConditionRepository.findByDependentID(dependent.getDependentID())
                                                                                                         .stream()
                                                                                                         .map(hc -> new Dependent_Profile.HealthCondition(hc.getConditionID(), getHealthConditionName(hc.getConditionID())))
                                                                                                         .collect(Collectors.toList()),
                                                    dependentAllergyRepository.findByDependentID(dependent.getDependentID())
                                                                                                 .stream()
                                                                                                 .map(a -> new Dependent_Profile.Allergy(a.getAllergyID(), getAllergyName(a.getAllergyID())))
                                                                                                 .collect(Collectors.toList()),
                                                    dependentMedicationRepository.findByDependentID(dependent.getDependentID())
                                                                                                    .stream()
                                                                                                    .map(m -> new Dependent_Profile.Medication_P(m.getMedicationID(), getMedicationName(m.getMedicationID())))
                                                                                                    .collect(Collectors.toList())


                                              ))
                                              .collect(Collectors.toList());
        
        response.put("dependents", dependents);


        System.out.println("Profile data sent to frontend");
        return ResponseEntity.ok(response);
    }

    public String getHealthConditionName(int conditionID) {
        return healthConditionsListRepository.findByConditionID(conditionID).getName();
    }

    public String getAllergyName(int allergyID) {
        return allergiesListRepository.findByAllergyID(allergyID).getName();
    }

    public String getMedicationName(int medicationID) {
        return medicationRepository.findById(medicationID).getName();
    }




    // static class 

    static class Payment_Info {
        private int cardID;
        private String cardHolderName;
        private String cardNumber;
        private String expirationDate;
        private String cvv;
    
        public Payment_Info(int cardID, String cardHolderName, String cardNumber, String expirationDate, String cvv) {
            this.cardID = cardID;
            this.cardHolderName = cardHolderName;
            this.cardNumber = cardNumber;
            this.expirationDate = expirationDate;
            this.cvv = cvv;
        }
    
        public int getCardID() {
            return this.cardID;
        }
    
        public String getCardHolderName() {
            return this.cardHolderName;
        }
    
        public String getCardNumber() {
            return this.cardNumber;
        }
    
        public String getExpirationDate() {
            return this.expirationDate;
        }
    
        public String getCvv() {
            return this.cvv;
        }
    }
    

    static class CurrentMedication {
        private int medicationID;
        private String name;

        public CurrentMedication(int medicationID, String name) {
            this.medicationID = medicationID;
            this.name = name;
        }

        public int getMedicationID() {
            return medicationID;
        }

        public String getName() {
            return name;
        }
    }

    static class HealthCondition {
        private int conditionID;
        private String name;

        public HealthCondition(int conditionID, String name) {
            this.conditionID = conditionID;
            this.name = name;
        }

        public int getConditionID() {
            return conditionID;
        }

        public String getName() {
            return name;
        }
    }

    static class CurrentAllergy {
        private int allergyID;
        private String name;

        public CurrentAllergy(int allergyID, String name) {
            this.allergyID = allergyID;
            this.name = name;
        }

        public int getAllergyID() {
            return allergyID;
        }

        public String getName() {
            return name;
        }
    }

    static class Delivery_Address {
        private int deliveryAddressID;
        private String houseNumber;
        private String landmark;
        private String city;
        private String state;
        private String country;
        private String postalCode;

        public Delivery_Address(int deliveryAddressID, String houseNumber, String landmark, String city, String state, String country, String postalCode) {
            this.deliveryAddressID = deliveryAddressID;
            this.houseNumber = houseNumber;
            this.landmark = landmark;
            this.city = city;
            this.state = state;
            this.country = country;
            this.postalCode = postalCode;
        }


        public int getDeliveryAddressID() {
            return deliveryAddressID;
        }

        public String getHouseNumber() {
            return houseNumber;
        }

        public String getCity() {
            return city;
        }

        public String getState() {
            return state;
        }

        public String getLandmark() {
            return landmark;
        }

        public String getCountry() {
            return country;
        }

        public String getPostalCode() {
            return postalCode;
        }
    }



    static class Dependent_Profile {
        private String dependentID;
        private String name;
        private String image;
        private List<HealthCondition> healthConditions;
        private List<Allergy> allergies;
        private List<Medication_P> medications;

        public Dependent_Profile(String dependentID, String name, String image, 
                        List<HealthCondition> healthConditions, 
                        List<Allergy> allergies, 
                        List<Medication_P> medications) {
            this.dependentID = dependentID;
            this.name = name;
            this.image = image;
            this.healthConditions = healthConditions;
            this.allergies = allergies;
            this.medications = medications;
        }

        public String getDependentID() {
            return dependentID;
        }

        public String getName() {
            return name;
        }

        public String getImage() {
            return image;
        }

        public List<HealthCondition> getHealthConditions() {
            return healthConditions;
        }

        public List<Allergy> getAllergies() {
            return allergies;
        }

        public List<Medication_P> getMedications() {
            return medications;
        }

        // Nested DTOs
        public static class HealthCondition {
            private int conditionID;
            private String name;

            public HealthCondition(int conditionID, String name) {
                this.conditionID = conditionID;
                this.name = name;
            }

            public int getConditionID() {
                return conditionID;
            }

            public String getName() {
                return name;
            }
        }

        public static class Allergy {
            private int allergyID;
            private String name;

            public Allergy(int allergyID, String name) {
                this.allergyID = allergyID;
                this.name = name;
            }

            public int getAllergyID() {
                return allergyID;
            }

            public String getName() {
                return name;
            }
        }

        public static class Medication_P {
            private int medicationID;
            private String name;

            public Medication_P(int medicationID, String name) {
                this.medicationID = medicationID;
                this.name = name;
            }

            public int getMedicationID() {
                return medicationID;
            }

            public String getName() {
                return name;
            }
        }
    }

}

