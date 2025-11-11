  
import React from "react";
import type { Asset, User } from "../../types";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { generateAvatar } from "../utils/avatar";
import { useI18n } from "../context/I18nContext";
interface AssetDetailPageProps {
  asset: Asset;
  users: User[];
  onBack: () => void;
}

const DetailItem: React.FC<{ label: string; value?: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div>
    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
      {label}
    </dt>
    <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100">
      {value || "-"}
    </dd>
  </div>
);

const AssetDetailPage: React.FC<AssetDetailPageProps> = ({
  asset,
  users,
  onBack,
}) => {
  const assignedUser = users.find((u) => u.id === asset.assignedTo);
  const { t } = useI18n();

  const getUserName = (userId?: number) => {
    return users.find((u) => u.id === userId)?.name || "-";
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <Button variant="secondary" onClick={onBack}>
          &larr; {t("assets.detail.back")}
        </Button>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            {asset.name}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Asset ID: {asset.id}
          </p>
        </div>
        <Badge status={asset.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {t("assets.detail.assetDetails")}
              </h3>
            </div>
            <dl className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <DetailItem label="Category" value={asset.category} />
              <DetailItem label="Purchase Date" value={asset.purchaseDate} />
              <DetailItem
                label="Warranty Expiry"
                value={asset.warrantyExpiry}
              />
              <DetailItem label="Vendor" value={asset.vendor} />
            </dl>
          </Card>

          <Card>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {t("assets.detail.specificationsNotes")}
              </h3>
            </div>
            <dl className="p-4 space-y-4">
              <DetailItem
                label="Specifications"
                value={
                  <pre className="whitespace-pre-wrap font-sans">
                    {asset.specs}
                  </pre>
                }
              />
              <DetailItem label="Notes" value={asset.notes} />
            </dl>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {t("assets.detail.assignedTo")}
              </h3>
            </div>
            {assignedUser ? (
              <div className="p-4 flex items-center space-x-4">
                {(() => {
                  const { initials, bgColor } = generateAvatar(
                    assignedUser.name
                  );
                  return (
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white"
                      style={{ backgroundColor: bgColor }}
                    >
                      {initials}
                    </div>
                  );
                })()}
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {assignedUser.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {assignedUser.departmentName || "N/A"}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {assignedUser.email}
                  </p>
                </div>
              </div>
            ) : (
              <p className="p-4 text-slate-500 dark:text-slate-400">
                {t("assets.detail.unassigned")}
              </p>
            )}
          </Card>

          <Card>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {t("assets.detail.history")}
              </h3>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                {asset.history
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((entry, index) => (
                    <li key={index} className="py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {entry.date}
                        </p>
                        <Badge status={entry.status} />
                      </div>
                      <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {entry.notes && (
                          <p>
                            <strong>Notes:</strong> {entry.notes}
                          </p>
                        )}
                        {entry.userId && (
                          <p>
                            <strong>User:</strong> {getUserName(entry.userId)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailPage;
