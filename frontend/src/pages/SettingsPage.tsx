  
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { API_BASE_URL, getHeaders } from "../services/api";
import Card from "../components/ui/Card";
import { useI18n } from "../context/I18nContext";
const SettingsPage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.currentPassword) {
      setError("Current password is required");
      return;
    }
    setSaving(true);
    try {
      const updateData: any = {
        fullName: formData.fullName,
        email: formData.email,
        currentPassword: formData.currentPassword,
      };
      const passwordProvided = !!formData.password;
      if (passwordProvided) {
        updateData.password = formData.password;
      }
      const response = await fetch(`${API_BASE_URL}/admin/profile`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      const updatedAdmin = await response.json();
      if (passwordProvided) {
        logout();
        alert("Profile updated and password changed. Please login again.");
      } else {
        updateUser({
          fullName: updatedAdmin.fullName,
          email: updatedAdmin.email,
        });
        setSuccess("Profile updated successfully");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const { t } = useI18n();
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
        {t("settings.title")}
      </h1>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t("settings.fullName")}
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <Input
            label={t("settings.email")}
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label={t("settings.currentPassword")}
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <Input
            label={t("settings.newPassword")}
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            label={t("settings.confirmPassword")}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={saving} variant="secondary">
              {saving ? t("settings.saving") : t("settings.save")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default SettingsPage;
