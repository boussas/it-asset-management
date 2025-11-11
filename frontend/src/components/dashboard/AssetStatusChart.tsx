import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { type Asset, AssetStatus } from "../../../types";
import Card from "../ui/Card";
import { useI18n } from "../../context/I18nContext";

interface AssetStatusChartProps {
  assets: Asset[];
}

const COLORS = {
  [AssetStatus.InUse]: "#10b981", // green-500
  [AssetStatus.InStorage]: "#3b82f6", // blue-500
  [AssetStatus.InRepair]: "#f59e0b", // amber-500
  [AssetStatus.Decommissioned]: "#ef4444", // red-500
};

const AssetStatusChart: React.FC<AssetStatusChartProps> = ({ assets }) => {
  const { t } = useI18n();
  const data = useMemo(() => {
    const statusCounts = assets.reduce((acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1;
      return acc;
    }, {} as Record<AssetStatus, number>);

    return Object.entries(statusCounts).map(([name, value]) => ({
      name: name as AssetStatus,
      value,
    }));
  }, [assets]);

  return (
    <Card className="p-4 h-full">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
        {t("dashboard.assetsByStatus")}
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
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

export default AssetStatusChart;
