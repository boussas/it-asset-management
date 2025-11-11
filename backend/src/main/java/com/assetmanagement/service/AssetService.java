package com.assetmanagement.service;

import com.assetmanagement.dto.*;
import com.assetmanagement.exception.ResourceNotFoundException;
import com.assetmanagement.model.*;
import com.assetmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;

    public List<AssetDTO> getAllAssets() {
        return assetRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AssetDTO getAssetById(String id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + id));
        return convertToDTO(asset);
    }

    public List<AssetDTO> searchAssets(String searchTerm) {
        return assetRepository.searchAssets(searchTerm).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AssetDTO> getAssetsByStatus(AssetStatus status) {
        return assetRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public AssetDTO createAsset(AssetDTO assetDTO) {
        if (assetRepository.existsById(assetDTO.getId())) {
            throw new IllegalArgumentException("Asset ID already exists");
        }


        Asset asset = convertToEntity(assetDTO);

        if (asset.getHistory() == null) {
            asset.setHistory(new ArrayList<>());
        }

        AssetHistory history = AssetHistory.builder()
                .asset(asset)
                .date(LocalDate.now())
                .status(asset.getStatus())
                .user(asset.getAssignedUser())
                .notes("Asset created")
                .build();
        asset.getHistory().add(history);

        Asset savedAsset = assetRepository.save(asset);
        return convertToDTO(savedAsset);
    }

    @Transactional
    public AssetDTO updateAsset(String id, AssetDTO assetDTO) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found with id: " + id));

        AssetStatus oldStatus = asset.getStatus();
        Long oldAssignedUserId = asset.getAssignedUser() != null ?
                asset.getAssignedUser().getId() : null;

        updateAssetFields(asset, assetDTO);

        Long newAssignedUserId = asset.getAssignedUser() != null ?
                asset.getAssignedUser().getId() : null;

        if (!oldStatus.equals(asset.getStatus()) ||
                !java.util.Objects.equals(oldAssignedUserId, newAssignedUserId)) {

            StringBuilder notes = new StringBuilder();
            if (!oldStatus.equals(asset.getStatus())) {
                notes.append("Status changed from ").append(oldStatus)
                        .append(" to ").append(asset.getStatus());
            }
            if (!java.util.Objects.equals(oldAssignedUserId, newAssignedUserId)) {
                if (!notes.isEmpty()) notes.append(". ");
                notes.append("Reassignment");
            }

            AssetHistory history = AssetHistory.builder()
                    .asset(asset)
                    .date(LocalDate.now())
                    .status(asset.getStatus())
                    .user(asset.getAssignedUser())
                    .notes(notes.toString())
                    .build();
            asset.getHistory().add(history);
        }

        Asset updatedAsset = assetRepository.save(asset);
        return convertToDTO(updatedAsset);
    }


    @Transactional
    public void deleteAsset(String id) {
        if (!assetRepository.existsById(id)) {
            throw new ResourceNotFoundException("Asset not found with id: " + id);
        }
        assetRepository.deleteById(id);
    }

    private void updateAssetFields(Asset asset, AssetDTO dto) {
        asset.setName(dto.getName());
        asset.setCategory(dto.getCategory());
        asset.setStatus(dto.getStatus());
        asset.setPurchaseDate(dto.getPurchaseDate());
        asset.setNotes(dto.getNotes());
        asset.setVendor(dto.getVendor());
        asset.setWarrantyExpiry(dto.getWarrantyExpiry());
        asset.setSpecs(dto.getSpecs());

        if (dto.getAssignedTo() != null && dto.getAssignedTo() > 0) {
            User user = userRepository.findById(dto.getAssignedTo())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            asset.setAssignedUser(user);
        } else {
            asset.setAssignedUser(null);
        }
    }

    private AssetDTO convertToDTO(Asset asset) {
        return AssetDTO.builder()
                .id(asset.getId())
                .name(asset.getName())
                .category(asset.getCategory())
                .status(asset.getStatus())
                .purchaseDate(asset.getPurchaseDate())
                .assignedTo(asset.getAssignedUser() != null ?
                        asset.getAssignedUser().getId() : null)
                .notes(asset.getNotes())
                .vendor(asset.getVendor())
                .warrantyExpiry(asset.getWarrantyExpiry())
                .specs(asset.getSpecs())
                .history(asset.getHistory().stream()
                        .map(this::convertHistoryToDTO)
                        .collect(Collectors.toList()))
                .build();
    }

    private Asset convertToEntity(AssetDTO dto) {
        Asset asset = Asset.builder()
                .id(dto.getId())
                .name(dto.getName())
                .category(dto.getCategory())
                .status(dto.getStatus())
                .purchaseDate(dto.getPurchaseDate())
                .notes(dto.getNotes())
                .vendor(dto.getVendor())
                .warrantyExpiry(dto.getWarrantyExpiry())
                .specs(dto.getSpecs())
                .build();

        if (dto.getAssignedTo() != null) {
            User user = userRepository.findById(dto.getAssignedTo())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            asset.setAssignedUser(user);
        }

        return asset;
    }

    private AssetHistoryDTO convertHistoryToDTO(AssetHistory history) {
        return AssetHistoryDTO.builder()
                .id(history.getId())
                .date(history.getDate())
                .status(history.getStatus())
                .userId(history.getUser() != null ? history.getUser().getId() : null)
                .notes(history.getNotes())
                .build();
    }
}