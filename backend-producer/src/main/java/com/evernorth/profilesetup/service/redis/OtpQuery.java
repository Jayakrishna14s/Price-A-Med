package com.evernorth.profilesetup.service.redis;

import com.evernorth.profilesetup.service.redis.entity.Otp;
import com.evernorth.profilesetup.service.redis.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OtpQuery {
    @Autowired
    private OtpRepository otpRepository;

    public Otp save(Otp otp) {
        return otpRepository.save(otp);
    }

    public Otp findById(String id) {
        return otpRepository.findById(id); 
    }

    public Otp update(Otp otp) {
        return otpRepository.save(otp);
    }

    public List<Otp> findAll() {
        return otpRepository.findAll();
    }

    public String delete(String id) {
        return otpRepository.deleteById(id);
    }

    public String deleteAll() {
        return otpRepository.deleteAll();
    }


}



//    public List<Object> findAll() {
//        return otpRepository.findAll();
//    }















//
//
//import com.evernorth.profilesetup.service.redis.entity.Otp;
//import com.evernorth.profilesetup.service.redis.repository.OtpRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class OtpQuery {
//
//    @Autowired
//    private OtpRepository otpRepository;
//
//    public Iterable<Otp> getOtps() {
//        return otpRepository.findAll();
//    }
//
//    public Optional<Otp> getOtp(String taskID) {
//        return otpRepository.findById(taskID);
//    }
//
//    public Otp createOtp(Otp otp) {
//        return otpRepository.save(otp);
//    }
//
//    public Otp updateOtp(Otp otp) {
//        return otpRepository.save(otp);
//    }
//
//    public Optional<Otp> updateOtp(String taskID, Otp otp) {
////        return otpRepository.findById(taskID).map(otpRepository::save);
//        return otpRepository.findById(taskID).map(existingOtp -> {
//            existingOtp.setOtp(otp.getOtp());
//            return otpRepository.save(existingOtp);
//        });
//    }
//
//    public void deleteStudent(String taskID) {
//        otpRepository.deleteById(taskID);
//    }
//
//
//}
