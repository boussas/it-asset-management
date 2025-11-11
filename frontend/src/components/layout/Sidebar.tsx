  
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";   
import {
  DashboardIcon,
  AssetsIcon,
  UsersIcon,
  DepartmentsIcon,
} from "../../constants";
import { Bars3Icon, Cog6ToothIcon } from "@heroicons/react/24/outline";   
import { useI18n } from "../../context/I18nContext";
const NavLink: React.FC<{
  icon: React.ElementType;
  label: string;
  href: string;   
  collapsed: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, href, collapsed, onClick }) => {
  const location = useLocation();   
  const isActive = location.pathname === href;   
  const activeClasses =
    "bg-primary-600 text-white dark:bg-primary-600 dark:text-white";
  const inactiveClasses =
    "text-slate-600 hover:bg-slate-100 hover:text-black dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white";
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex w-full items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      <Icon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
      {!collapsed && (
        <span className="ml-3 truncate text-slate-900 dark:text-slate-100 transition-opacity duration-200">
          {label}
        </span>
      )}
    </button>
  );
};
const Sidebar: React.FC = () => {
    
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { t } = useI18n();
  return (
    <div
      className={`flex flex-col h-screen transition-all duration-300 border-r ${
        collapsed ? "w-20" : "w-64"
      } bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700`}
    >
      <div className="flex items-center justify-end px-4 py-4">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-md transition cursor-pointer"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-2 space-y-1 ">
          <NavLink
            icon={DashboardIcon}
            label="Dashboard"
            href="/dashboard"
            collapsed={collapsed}
            onClick={() => navigate("/dashboard")}
          />
          <NavLink
            icon={AssetsIcon}
            label="Assets"
            href="/assets"   
            collapsed={collapsed}
            onClick={() => navigate("/assets")}
          />
          <NavLink
            icon={UsersIcon}
            label="Users"
            href="/users"   
            collapsed={collapsed}
            onClick={() => navigate("/users")}
          />
          <NavLink
            icon={DepartmentsIcon}
            label={t("departments.departments")}
            href="/departments"
            collapsed={collapsed}
            onClick={() => navigate("/departments")}
          />
          <NavLink   
            icon={Cog6ToothIcon}
            label={t("settings.title")}
            href="/settings"
            collapsed={collapsed}
            onClick={() => navigate("/settings")}
          />
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
