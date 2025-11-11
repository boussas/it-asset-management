import React from "react";
import type { Asset, User } from "../../../types";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useI18n } from "../../context/I18nContext";

interface AssetTableProps {
  assets: Asset[];
  users: User[];
  onEdit: (asset: Asset) => void;
  onDelete: (assetId: string) => void;
  onViewHistory: (asset: Asset) => void;
  onSelectAsset: (asset: Asset) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({
  assets,
  users,
  onEdit,
  onDelete,
  onViewHistory,
  onSelectAsset,
}) => {
  const getUserName = (userId?: number) => {
    return users.find((u) => u.id === userId)?.name || "Unassigned";
  };
    const { t } = useI18n();
  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              {t("assets.table.name")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              {t("assets.table.category")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              {t("assets.table.status")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
             {t("assets.table.assignedTo")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              {t("assets.table.purchaseDate")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              {t("assets.table.actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectAsset(asset);
                  }}
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {asset.name}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {asset.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Badge status={asset.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {getUserName(asset.assignedTo)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {asset.purchaseDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => onViewHistory(asset)}
                    size="sm"
                  >
                    History
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => onEdit(asset)}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(asset.id)}
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
