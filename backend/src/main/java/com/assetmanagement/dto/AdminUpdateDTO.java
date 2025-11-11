package com.assetmanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminUpdateDTO {
    @Size(min = 2, message = "Full name must be at least 2 characters")
    private String fullName;

    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Current password is required")
    @Size(min = 6, message = "Current password must be at least 6 characters")
    private String currentPassword;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}