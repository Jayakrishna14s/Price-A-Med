package com.evernorth.profilesetup.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@EnableRedisRepositories
public class RedisConfig {

    @Bean
    public JedisConnectionFactory jedisConnectionFactory() throws Exception {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName("redis");
        redisStandaloneConfiguration.setPort(6379);
        redisStandaloneConfiguration.setDatabase(0);
        redisStandaloneConfiguration.setPassword("");
        return new JedisConnectionFactory(redisStandaloneConfiguration);


    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        try {
            redisTemplate.setConnectionFactory(jedisConnectionFactory());



            redisTemplate.setKeySerializer(new StringRedisSerializer());
            redisTemplate.setHashKeySerializer(new StringRedisSerializer());
            redisTemplate.setHashValueSerializer(new ClassLoaderAwareRedisSerializer<>(Object.class));
            redisTemplate.setValueSerializer(new ClassLoaderAwareRedisSerializer<>(Object.class));

            redisTemplate.setEnableTransactionSupport(true);
            redisTemplate.afterPropertiesSet();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return redisTemplate;
    }

}


//            redisTemplate.setKeySerializer(new StringRedisSerializer());
//            redisTemplate.setHashKeySerializer(new StringRedisSerializer());
//            redisTemplate.setHashValueSerializer(new JdkSerializationRedisSerializer());
//            redisTemplate.setValueSerializer(new JdkSerializationRedisSerializer());


//        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration("localhost", 6379);
//        JedisClientConfiguration jedisClientConfig = JedisClientConfiguration.builder().build();
//        return new JedisConnectionFactory(config, jedisClientConfig);