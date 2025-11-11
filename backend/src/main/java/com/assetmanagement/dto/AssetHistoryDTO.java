package com.assetmanagement.dto;

import lombok.*;
import com.assetmanagement.model.AssetStatus;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetHistoryDTO {
    private Long id;
    private LocalDate date;
    private AssetStatus status;
    private Long userId;
    private String notes;
}
