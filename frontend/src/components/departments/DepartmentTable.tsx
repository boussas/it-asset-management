  
import React from "react";
import type { Department, User } from "../../../types";
import Button from "../ui/Button";
import { generateAvatar } from "../../utils/avatar";

interface DepartmentTableProps {
  departments: Department[];
  users: User[];
  onEdit: (dept: Department) => void;
  onDelete: (deptId: number) => void;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({
  departments,
  users,
  onEdit,
  onDelete,
}) => {
  const getDepartmentUsers = (departmentId: number) => {
    return users.filter((u) => u.departmentId === departmentId);
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Department Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Employee Count
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Employees
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
          {departments.map((dept) => {
            const deptUsers = getDepartmentUsers(dept.id);
            return (
              <tr key={dept.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
                  {dept.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {dept.employeeCount}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {deptUsers.length > 0 ? (
                    <div className="flex -space-x-2">
                      {deptUsers.slice(0, 5).map((user) => {
                        const { initials, bgColor } = generateAvatar(user.name);
                        return (
                          <div
                            key={user.id}
                            title={user.name}
                            className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-medium text-white"
                            style={{ backgroundColor: bgColor }}
                          >
                            {initials}
                          </div>
                        );
                      })}
                      {deptUsers.length > 5 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium">
                          +{deptUsers.length - 5}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 italic">
                      No employees
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => onEdit(dept)}
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(dept.id)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
