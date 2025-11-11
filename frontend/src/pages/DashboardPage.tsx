import React, { useMemo } from "react";
import StatCard from "../components/dashboard/StatCard";
import AssetStatusChart from "../components/dashboard/AssetStatusChart";
import RecentAssetsTable from "../components/dashboard/RecentAssetsTable";
import AssetDepartmentChart from "../components/dashboard/AssetDepartmentChart";
import { type Asset, type User, type Department, AssetStatus } from "../../types";
import { useI18n } from "../context/I18nContext";

const TotalAssetsIcon = () => (
  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 text-primary-600 dark:text-primary-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 7.125A2.25 2.25 0 014.5 4.875h15A2.25 2.25 0 0121.75 7.125v12.75A2.25 2.25 0 0119.5 22.125H4.5A2.25 2.25 0 012.25 19.875V7.125zM12 18.75a.75.75 0 000-1.5H5.25a.75.75 0 000 1.5H12z"
      />
    </svg>
  </div>
);
const InUseIcon = () => (
  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
);
const InRepairIcon = () => (
  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.474-4.474c-.048-.58-.028-1.193-.14-1.743A4.5 4.5 0 0019.5 3h-2.25a4.5 4.5 0 00-4.474 4.474c-.048.58-.028 1.193.14 1.743z"
      />
    </svg>
  </div>
);
const TotalUsersIcon = () => (
  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM3 21v-1.5a6 6 0 016-6h6a6 6 0 016 6V21"
      />
    </svg>
  </div>
);

interface DashboardPageProps {
  assets: Asset[];
  users: User[];
  departments: Department[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ assets, users, departments }) => {
  const { t } = useI18n();
  const stats = useMemo(() => {
    const totalAssets = assets.length;
    const assetsInUse = assets.filter(
      (a) => a.status === AssetStatus.InUse
    ).length;
    const assetsInRepair = assets.filter(
      (a) => a.status === AssetStatus.InRepair
    ).length;
    const totalUsers = users.length;

    return {
      totalAssets,
      assetsInUse,
      assetsInRepair,
      totalUsers,
    };
  }, [assets, users]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
        {t("dashboard.title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title={t("dashboard.totalAssets")}
          value={stats.totalAssets}
          icon={<TotalAssetsIcon />}
        />
        <StatCard
          title={t("dashboard.assetsInUse")}
          value={stats.assetsInUse}
          icon={<InUseIcon />}
        />
        <StatCard
          title={t("dashboard.assetsInRepair")}
          value={stats.assetsInRepair}
          icon={<InRepairIcon />}
        />
        <StatCard
          title={t("dashboard.totalUsers")}
          value={stats.totalUsers}
          icon={<TotalUsersIcon />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AssetStatusChart assets={assets} />
        <AssetDepartmentChart assets={assets} users={users} departments={departments} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RecentAssetsTable assets={assets} users={users} />
      </div>
    </div>
  );
};

export default DashboardPage;