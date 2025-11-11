  
import React from "react";
import type { User, Asset } from "../../../types";
import Button from "../ui/Button";
import { generateAvatar } from "../../utils/avatar";

interface UserTableProps {
  users: User[];
  assets: Asset[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  assets,
  onEdit,
  onDelete,
}) => {
  const getAssignedAssetsCount = (userId: number) => {
    return assets.filter((asset) => asset.assignedTo === userId).length;
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Assigned Assets
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
                <div className="flex items-center">
                  {(() => {
                    const { initials, bgColor } = generateAvatar(user.name);
                    return (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white font-medium text-sm"
                        style={{ backgroundColor: bgColor }}
                      >
                        {initials}
                      </div>
                    );
                  })()}
                  {user.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {user.departmentName || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {getAssignedAssetsCount(user.id)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => onEdit(user)}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(user.id)}
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

export default UserTable;
