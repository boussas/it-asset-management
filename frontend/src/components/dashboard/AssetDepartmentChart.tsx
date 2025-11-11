import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Asset, User, Department } from "../../../types";
import Card from "../ui/Card";
import { useI18n } from "../../context/I18nContext";

interface AssetDepartmentChartProps {
  assets: Asset[];
  users: User[];
  departments: Department[];
}

const COLORS = [
  "#3b82f6", // blue-500
  "#10b981", // green-500
  "#ef4444", // red-500
  "#f59e0b", // amber-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#64748b", // slate-500
];

const AssetDepartmentChart: React.FC<AssetDepartmentChartProps> = ({
  assets,
  users,
}) => {
    const { t } = useI18n();
  
  const data = useMemo(() => {
    const departmentMap = new Map<string, number>();

    assets.forEach((asset) => {
      let departmentName = "Unassigned";
      if (asset.assignedTo) {
        const user = users.find((u) => u.id === asset.assignedTo);
        if (user) {
          departmentName = user.departmentName || "Unknown";
        }
      }
      departmentMap.set(
        departmentName,
        (departmentMap.get(departmentName) || 0) + 1
      );
    });

    return Array.from(departmentMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [assets, users]);

  return (
    <Card className="p-4 h-full">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
        {t("dashboard.assetsByDepartment")}
      </h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(41, 191, 255, 0.9)",
                border: "1px solid #475569",
                borderRadius: "0.5rem",
                color: "#f1f5f9",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AssetDepartmentChart;