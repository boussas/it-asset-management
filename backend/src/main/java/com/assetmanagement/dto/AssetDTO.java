package com.assetmanagement.dto;

import lombok.*;
import com.assetmanagement.model.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetDTO {
    @NotBlank(message = "Asset ID is required")
    private String id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Category is required")
    private AssetCategory category;

    @NotNull(message = "Status is required")
    private AssetStatus status;


    @NotNull(message = "Purchase date is required")
    private LocalDate purchaseDate;


    private Long assignedTo;

    private String notes;

    @NotBlank(message = "Vendor is required")
    private String vendor;

    private LocalDate warrantyExpiry;

    private String specs;

    private List<AssetHistoryDTO> history;
}
