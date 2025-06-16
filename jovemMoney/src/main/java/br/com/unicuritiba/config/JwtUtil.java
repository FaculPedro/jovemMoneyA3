package br.com.unicuritiba.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import br.com.unicuritiba.models.User;
import java.util.Date;
import javax.crypto.SecretKey;

public class JwtUtil {
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor("fuck-hmac-for-requesting-a-long-password-haha".getBytes());
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 2; // 2 hours in ms

    public static String generateToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }


    public static String getSubject(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public static User getUserFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        User user = new User();
        user.setCpf(claims.getSubject());
        user.setId(((Number) claims.get("id")).longValue());
        user.setName((String) claims.get("name"));
        return user;
    }

    public static boolean isTokenValid(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
