import React, { useState, useEffect } from "react";
import {
  type Asset,
  type User,
  AssetCategory,
  AssetStatus,
} from "../../../types";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { useI18n } from "../../context/I18nContext";

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (asset: Asset | Partial<Asset>) => void;
  asset: Asset | null;
  users: User[];
  saving?: boolean;
}

const AssetModal: React.FC<AssetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  asset,
  users,
  saving = false,
}) => {
  const [formData, setFormData] = useState<Partial<Asset>>({});

  useEffect(() => {
    if (asset) {
      setFormData(asset);
    } else {
      setFormData({
        id: `IT-${String(Date.now()).slice(-4)}`,
        name: "",
        purchaseDate: new Date().toISOString().split("T")[0],
        warrantyExpiry: new Date(
          new Date().setFullYear(new Date().getFullYear() + 2)
        )
          .toISOString()
          .split("T")[0],
        status: AssetStatus.InStorage,
        category: AssetCategory.Laptop,
        vendor: "",
        specs: "",
        notes: "",
        assignedTo: undefined,
      });
    }
  }, [asset, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "assignedTo") {
      setFormData((prev) => ({
        ...prev,
        assignedTo: value === "" ? undefined : Number(value),
      }));
      return;
    }

    if (name === "status") {
      setFormData((prev) => ({
        ...prev,
        status: value as AssetStatus,
      }));
      return;
    }

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value as AssetCategory,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  const { t } = useI18n();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={asset ? t("assets.modal.edit") : t("assets.modal.add")}
    >
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label={t("assets.modal.id")}
            id="id"
            name="id"
            value={formData.id || ""}
            onChange={handleChange}
            required
            disabled={!!asset}
          />
          <Select
            label="Category"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {Object.values(AssetCategory).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
          <Select
            label="Status"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {Object.values(AssetStatus).map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </Select>
        </div>

        <Input
          label={t("assets.modal.name")}
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />

        <Input
          label="Vendor"
          id="vendor"
          name="vendor"
          value={formData.vendor || ""}
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Purchase Date"
            id="purchaseDate"
            name="purchaseDate"
            type="date"
            value={formData.purchaseDate || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Warranty Expiry"
            id="warrantyExpiry"
            name="warrantyExpiry"
            type="date"
            value={formData.warrantyExpiry || ""}
            onChange={handleChange}
          />
          <Select
            label="Assigned To"
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo || ""}
            onChange={handleChange}
          >
            <option value="">Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label
            htmlFor="specs"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Specifications
          </label>
          <textarea
            id="specs"
            name="specs"
            rows={3}
            value={formData.specs || ""}
            onChange={handleChange}
            className="mt-1 dark:text-white appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-slate-700"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes || ""}
            onChange={handleChange}
            className="mt-1 dark:text-white appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-slate-700"
          ></textarea>
        </div>
        <div className="pt-4 flex justify-end">
          <Button variant="secondary" type="submit" disabled={saving}>
            {saving ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t("assets.modal.saving")}
              </span>
            ) : asset ? (
              t("assets.modal.save")
            ) : (
              t("assets.modal.create")
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AssetModal;
