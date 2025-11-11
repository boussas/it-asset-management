package com.assetmanagement.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {
    @Id
    @Column(name = "asset_id", nullable = false, unique = true)
    private String id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetStatus status;

    @Column(name = "purchase_date", nullable = false)
    private LocalDate purchaseDate;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User assignedUser;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = false)
    private String vendor;

    @Column(name = "warranty_expiry")
    private LocalDate warrantyExpiry;

    @Column(columnDefinition = "TEXT")
    private String specs;

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssetHistory> history = new ArrayList<>();
}