package com.assetmanagement.repository;

import com.assetmanagement.model.Asset;
import com.assetmanagement.model.AssetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, String> {
    List<Asset> findByStatus(AssetStatus status);
    List<Asset> findByAssignedUserId(Long userId);

    @Query("""
    SELECT a FROM Asset a 
    LEFT JOIN a.assignedUser u
    WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
       OR LOWER(u.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
""")
    List<Asset> searchAssets(String searchTerm);

}