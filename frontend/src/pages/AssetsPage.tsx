import React, { useState, useMemo } from "react";
import { type Asset, type User, AssetStatus } from "../../types";
import AssetTable from "../components/assets/AssetTable";
import AssetModal from "../components/assets/AssetModal";
import AssetHistoryModal from "../components/assets/AssetHistoryModal";
import AssetDetailPage from "./AssetDetailPage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { assetsApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../context/I18nContext";

interface AssetsPageProps {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  users: User[];
  onRefresh: () => Promise<void>;
}

const AssetsPage: React.FC<AssetsPageProps> = ({
  
  assets,
  users,
  onRefresh,
}) => {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [viewingAsset, setViewingAsset] = useState<Asset | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AssetStatus | "all">("all");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const openModalForNew = () => {
    setEditingAsset(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setIsModalOpen(true);
  };

  const openHistoryModal = (asset: Asset) => {
    setViewingAsset(asset);
    setIsHistoryModalOpen(true);
  };

  const handleSelectAsset = async (asset: Asset) => {
    try {
      const fullAsset = await assetsApi.getById(asset.id);
      navigate(`/assets/${asset.id}`, { state: { asset: fullAsset } });
    } catch (error) {
      console.error("Failed to load asset details:", error);
    }
  };

  const handleBackToList = () => setSelectedAsset(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAsset(null);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setViewingAsset(null);
  };

  const handleSaveAsset = async (assetToSave: Asset) => {
    setSaving(true);
    try {
      if (editingAsset) await assetsApi.update(assetToSave.id, assetToSave);
      else await assetsApi.create(assetToSave);

      await onRefresh();
      closeModal();
    } catch (error) {
      console.error("Failed to save asset:", error);
      alert("Failed to save asset. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAsset = async (assetId: string) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await assetsApi.delete(assetId);
        await onRefresh();
      } catch (error) {
        console.error("Failed to delete asset:", error);
        alert("Failed to delete asset. Please try again.");
      }
    }
  };

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = asset.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || asset.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [assets, searchTerm, statusFilter]);

  if (selectedAsset) {
    return (
      <AssetDetailPage
        asset={selectedAsset}
        users={users}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="container mx-auto">
        
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          {t("assets.title")}
        </h1>
        <Button variant="secondary" onClick={openModalForNew}>
          {t("assets.add")}
        </Button>
      </div>

        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="md:col-span-2">
          <Input
            label={t("assets.search")}
            id="search"
            placeholder="Search by name or serial number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          label={t("assets.filterStatus")}
          id="statusFilter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as AssetStatus | "all")
          }
        >
          <option value="all">{t("assets.allStatuses")}</option>
          {Object.values(AssetStatus).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>

        
      <AssetTable
        assets={filteredAssets}
        users={users}
        onEdit={openModalForEdit}
        onDelete={handleDeleteAsset}
        onViewHistory={openHistoryModal}
        onSelectAsset={handleSelectAsset}
      />

        
      <AssetModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveAsset}
        asset={editingAsset}
        users={users}
        saving={saving}
      />

      {viewingAsset && (
        <AssetHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={closeHistoryModal}
          asset={viewingAsset}
          users={users}
        />
      )}
    </div>
  );
};

export default AssetsPage;
