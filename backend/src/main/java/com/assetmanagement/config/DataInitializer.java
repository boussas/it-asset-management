package com.assetmanagement.config;

import com.assetmanagement.model.*;
import com.assetmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {
    private final PasswordEncoder passwordEncoder;
    @Bean
    public CommandLineRunner initializeData(
            UserRepository userRepository,
            AssetRepository assetRepository,
            AssetHistoryRepository historyRepository,
            DepartmentRepository departmentRepository,
            AdminRepository adminRepository) {

        return args -> {
            if (adminRepository.count() == 0) {
                Admin admin = Admin.builder()
                        .username("admin_username")
                        .password(passwordEncoder.encode("admin_password"))
                        .email("admin@admin.com")
                        .fullName("Administrator Administrator")
                        .build();
                adminRepository.save(admin);
                System.out.println("Admin created - Username: admin_username, Password: admin_password");
            }
            if (userRepository.count() == 0) {
                Department engineering = Department.builder()
                        .name("Engineering")
                        .build();

                Department marketing = Department.builder()
                        .name("Marketing")
                        .build();

                Department sales = Department.builder()
                        .name("Sales")
                        .build();

                Department it = Department.builder()
                        .name("IT")
                        .build();

                Department hr = Department.builder()
                        .name("HR")
                        .build();

                Department finance = Department.builder()
                        .name("Finance")
                        .build();

                departmentRepository.saveAll(Arrays.asList(engineering, marketing, sales, it, hr, finance));

                // Create Users
                User alice = User.builder()
                        .name("Alice Johnson")
                        .email("alice@example.com")
                        .department(engineering)
                        .build();

                User bob = User.builder()
                        .name("Bob Williams")
                        .email("bob@example.com")

                        .department(marketing)
                        .build();

                User charlie = User.builder()
                        .name("Charlie Brown")
                        .email("charlie@example.com")

                        .department(sales)
                        .build();

                User diana = User.builder()
                        .name("Diana Miller")
                        .email("diana@example.com")
                        .department(it)
                        .build();

                userRepository.saveAll(Arrays.asList(alice, bob, charlie, diana));

                // Create Assets 
                Asset macbook = Asset.builder()
                        .id("IT-001")
                        .name("MacBook Pro 16\"")
                        .category(AssetCategory.LAPTOP)
                        .status(AssetStatus.IN_USE)
                        .purchaseDate(LocalDate.of(2023, 1, 15))
                        .assignedUser(alice)
                        .notes("Assigned for design work.")
                        .vendor("Apple Inc.")
                        .warrantyExpiry(LocalDate.of(2026, 1, 14))
                        .specs("Apple M2 Pro, 16GB RAM, 512GB SSD")
                        .build();

               

                Asset monitor = Asset.builder()
                        .id("IT-002")
                        .name("Dell UltraSharp 27\"")
                        .category(AssetCategory.MONITOR)
                        .status(AssetStatus.IN_USE)
                        .purchaseDate(LocalDate.of(2023, 2, 20))
                        .assignedUser(bob)
                        .vendor("Dell Technologies")
                        .warrantyExpiry(LocalDate.of(2026, 2, 19))
                        .specs("27-inch 4K UHD (3840 x 2160), IPS")
                        .build();

                

                Asset laptop = Asset.builder()
                        .id("IT-003")
                        .name("Lenovo ThinkPad X1")
                        .category(AssetCategory.LAPTOP)
                        .status(AssetStatus.IN_STORAGE)
                        .purchaseDate(LocalDate.of(2022, 11, 10))
                        .notes("Ready for assignment")
                        .vendor("Lenovo")
                        .warrantyExpiry(LocalDate.of(2025, 11, 9))
                        .specs("Intel Core i7, 16GB RAM, 1TB SSD")
                        .build();

               

                Asset phone = Asset.builder()
                        .id("IT-004")
                        .name("iPhone 14")
                        .category(AssetCategory.PHONE)
                        .status(AssetStatus.IN_REPAIR)
                        .purchaseDate(LocalDate.of(2023, 3, 1))
                        .assignedUser(charlie)
                        .vendor("Apple Inc.")
                        .warrantyExpiry(LocalDate.of(2025, 2, 28))
                        .specs("A15 Bionic chip, 256GB Storage, Blue")
                        .build();

                

                Asset mouse = Asset.builder()
                        .id("IT-005")
                        .name("Logitech MX Master 3")
                        .category(AssetCategory.MOUSE)
                        .status(AssetStatus.DECOMMISSIONED)
                        .purchaseDate(LocalDate.of(2021, 6, 1))
                        .vendor("Logitech")
                        .warrantyExpiry(LocalDate.of(2023, 5, 31))
                        .specs("Wireless, 8000 DPI, USB-C Charging")
                        .build();

               

                assetRepository.saveAll(Arrays.asList(macbook, monitor, laptop, phone, mouse));

                System.out.println("Sample data initialized successfully!");
            }
        };
    }
}