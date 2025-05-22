package com.evernorth.profilesetup.service.redis.repository;


import com.evernorth.profilesetup.service.redis.entity.Otp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
// import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
// import java.util.Set;
import java.util.stream.Collectors;

@Repository
public class OtpRepository {
    public static final String HASH_KEY = "Otp";

    public static final int TTL_SECONDS = 600;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public Otp save(Otp otp) {
        redisTemplate.opsForHash().put(HASH_KEY, otp.getId(), otp);
        redisTemplate.expire(HASH_KEY, Duration.ofSeconds(TTL_SECONDS));
        return otp;
    }

    public List<Otp> findAll() {
//        return redisTemplate.opsForHash().values(HASH_KEY);
        return redisTemplate.opsForHash()
                .values(HASH_KEY)
                .stream()
                .map(obj -> (Otp) obj) // Cast each Object to Otp
                .collect(Collectors.toList());
    }

    public Otp findById(String id) {
        return (Otp) redisTemplate.opsForHash().get(HASH_KEY, id);
    }

    public String deleteById(String id) {
        redisTemplate.opsForHash().delete(HASH_KEY, id);
        return "OTP removed";
    }

    public String deleteAll() {
//        redisTemplate.opsForHash().delete(HASH_KEY);
        LinkedHashSet<Object> keys = (LinkedHashSet<Object>) redisTemplate.opsForHash().keys(HASH_KEY);
        if(keys.size() > 0)
            redisTemplate.opsForHash().delete(HASH_KEY, keys.toArray());
        return "All deleted;";
    }
}

