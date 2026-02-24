//package com.example.taskmanager.security;
//
//import java.sql.Date;
//
//import org.springframework.stereotype.Component;
//
//@Component
//public class JwtUtil {
//
//    private final String SECRET = "mysecretkey123456";
//
//    public String generateToken(String email) {
//        return Jwts.builder()
//                .setSubject(email)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
//                .signWith(SignatureAlgorithm.HS256, SECRET)
//                .compact();
//    }
//
//    public String extractEmail(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET)
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//}}