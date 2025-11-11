import React, { useMemo } from "react";
import type { Asset, User } from "../../../types";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { useI18n } from "../../context/I18nContext";

interface RecentAssetsTableProps {
  assets: Asset[];
  users: User[];
}

const RecentAssetsTable: React.FC<RecentAssetsTableProps> = ({
  assets,
  users,
}) => {
    const { t } = useI18n();

  const recentAssets = useMemo(() => {
    return [...assets]
      .sort(
        (a, b) =>
          new Date(b.purchaseDate).getTime() -
          new Date(a.purchaseDate).getTime()
      )
      .slice(0, 5);
  }, [assets]);

  const getUserName = (userId?: number) => {
    return users.find((u) => u.id === userId)?.name || "Unassigned";
  };

  return (
    <Card className="overflow-x-auto">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          {t("dashboard.recentAssets")}
        </h3>
      </div>
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
            >
              Asset Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
            >
              Assigned To
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
          {recentAssets.map((asset) => (
            <tr key={asset.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
                {asset.name}
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
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default RecentAssetsTable;
