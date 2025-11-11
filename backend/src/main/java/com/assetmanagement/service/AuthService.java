package com.assetmanagement.service;

import com.assetmanagement.dto.LoginRequest;
import com.assetmanagement.dto.LoginResponse;
import com.assetmanagement.model.Admin;
import com.assetmanagement.repository.AdminRepository;
import com.assetmanagement.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            Admin admin = adminRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("Admin not found"));

            String token = jwtUtil.generateToken(admin.getUsername());

            return LoginResponse.builder()
                    .token(token)
                    .username(admin.getUsername())
                    .email(admin.getEmail())
                    .fullName(admin.getFullName())
                    .build();

        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password");
        }
    }
}