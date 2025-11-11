import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AssetDetailPage from "./AssetDetailPage";
import type { Asset, User } from "../../types";

interface AssetDetailPageWrapperProps {
  assets: Asset[];
  users: User[];
}

const AssetDetailPageWrapper: React.FC<AssetDetailPageWrapperProps> = ({
  assets,
  users,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

    
  const assetFromState = location.state?.asset as Asset | undefined;

  const asset = assetFromState || assets.find((a) => a.id === id);

  if (!asset) {
    return <div>Asset not found</div>;
  }

  const handleBack = () => navigate("/assets");

  return <AssetDetailPage asset={asset} users={users} onBack={handleBack} />;
};

export default AssetDetailPageWrapper;
