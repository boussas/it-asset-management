package com.assetmanagement.controller;

import com.assetmanagement.dto.AdminUpdateDTO;
import com.assetmanagement.model.Admin;
import com.assetmanagement.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/profile")
    public ResponseEntity<Admin> getProfile() {
        return ResponseEntity.ok(adminService.getCurrentAdmin());
    }

    @PutMapping("/profile")
    public ResponseEntity<Admin> updateProfile(@Valid @RequestBody AdminUpdateDTO updateDTO) {
        return ResponseEntity.ok(adminService.updateCurrentAdmin(updateDTO));
    }
}