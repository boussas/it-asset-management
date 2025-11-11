package com.assetmanagement.controller;

import com.assetmanagement.dto.AssetDTO;
import com.assetmanagement.model.AssetStatus;
import com.assetmanagement.service.AssetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
public class AssetController {
    private final AssetService assetService;

    @GetMapping
    public ResponseEntity<List<AssetDTO>> getAllAssets(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) AssetStatus status) {

        if (search != null && !search.isEmpty()) {
            return ResponseEntity.ok(assetService.searchAssets(search));
        }

        if (status != null) {
            return ResponseEntity.ok(assetService.getAssetsByStatus(status));
        }

        return ResponseEntity.ok(assetService.getAllAssets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetDTO> getAssetById(@PathVariable String id) {
        return ResponseEntity.ok(assetService.getAssetById(id));
    }

    @PostMapping
    public ResponseEntity<AssetDTO> createAsset(@Valid @RequestBody AssetDTO assetDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(assetService.createAsset(assetDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetDTO> updateAsset(
            @PathVariable String id,
            @Valid @RequestBody AssetDTO assetDTO) {
        return ResponseEntity.ok(assetService.updateAsset(id, assetDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable String id) {
        assetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }
}