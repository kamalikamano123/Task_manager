//package com.example.taskmanager.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        http
//            .csrf().disable()
//            .authorizeHttpRequests()
//            .requestMatchers("/api/auth/**").permitAll()
//            .anyRequest().authenticated()
//            .and()
//            .httpBasic();
//
//        return http.build();
//    }
//}
