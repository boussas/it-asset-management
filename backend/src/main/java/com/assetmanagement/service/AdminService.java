package com.assetmanagement.service;

import com.assetmanagement.dto.AdminUpdateDTO;
import com.assetmanagement.exception.ResourceNotFoundException;
import com.assetmanagement.model.Admin;
import com.assetmanagement.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public Admin getCurrentAdmin() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return adminRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
    }

    public Admin updateCurrentAdmin(AdminUpdateDTO updateDTO) {
        Admin admin = getCurrentAdmin();

        if (!passwordEncoder.matches(updateDTO.getCurrentPassword(), admin.getPassword())) {
            throw new IllegalArgumentException("Invalid current password");
        }

        if (updateDTO.getFullName() != null && !updateDTO.getFullName().isEmpty()) {
            admin.setFullName(updateDTO.getFullName());
        }

        if (updateDTO.getEmail() != null && !updateDTO.getEmail().isEmpty()) {
            admin.setEmail(updateDTO.getEmail());
        }

        if (updateDTO.getPassword() != null && !updateDTO.getPassword().isEmpty()) {
            admin.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
        }

        return adminRepository.save(admin);
    }
}