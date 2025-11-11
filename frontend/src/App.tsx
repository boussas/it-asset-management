import React, { useState, useEffect } from "react";
import { I18nProvider } from "./context/I18nContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import DashboardPage from "./pages/DashboardPage";
import AssetsPage from "./pages/AssetsPage";
import UsersPage from "./pages/UsersPage";
import { assetsApi, usersApi, departmentsApi } from "./services/api";
import type { Asset, User, Department } from "../types";
import DepartmentsPage from "./pages/DepartmentsPage";
import { Navigate, Route, Routes } from "react-router-dom";
import AssetDetailPageWrapper from "./pages/AssetDetailPageWrapper";
import SettingsPage from "./pages/SettingsPage";
const MainApp: React.FC = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);
  const loadData = async () => {
    try {
      const [assetsData, usersData, departmentsData] = await Promise.all([
        assetsApi.getAll(),
        usersApi.getAll(),
        departmentsApi.getAll(),
      ]);
      setAssets(assetsData);
      setUsers(usersData);
      setDepartments(departmentsData);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100 dark:bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  assets={assets}
                  users={users}
                  departments={departments}
                />
              }
            />
            <Route
              path="/assets"
              element={
                <AssetsPage
                  assets={assets}
                  setAssets={setAssets}
                  users={users}
                  onRefresh={loadData}
                />
              }
            />
            <Route
              path="/assets/:id"
              element={<AssetDetailPageWrapper assets={assets} users={users} />}
            />
            <Route
              path="/users"
              element={
                <UsersPage
                  users={users}
                  setUsers={setUsers}
                  assets={assets}
                  departments={departments}
                  onRefresh={loadData}
                />
              }
            />
            <Route
              path="/departments"
              element={
                <DepartmentsPage
                  departments={departments}
                  setDepartments={setDepartments}
                  users={users}
                  onRefresh={loadData}
                />
              }
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
const App: React.FC = () => {
  return (
    <AuthProvider>
      <I18nProvider>
        <MainApp />
      </I18nProvider>
    </AuthProvider>
  );
};
export default App;
