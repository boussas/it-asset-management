import React from "react";
import type { Asset, User } from "../../../types";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import { useI18n } from "../../context/I18nContext";

interface AssetHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset;
  users: User[];
}

const AssetHistoryModal: React.FC<AssetHistoryModalProps> = ({
  isOpen,
  onClose,
  asset,
  users,
}) => {
  const getUserName = (userId?: number) => {
    return users.find((u) => u.id === userId)?.name || "-";
  };
  const { t } = useI18n();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("assets.history.title", { name: asset.name, id: asset.id })}
    >
      <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
        {asset.history && asset.history.length > 0 ? (
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
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400">
            {t("assets.history.noHistory")}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default AssetHistoryModal;
