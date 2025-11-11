  
import React, { useState, useMemo } from "react";
import { type User, type Asset, type Department } from "../../types";
import UserTable from "../components/users/UserTable";
import Button from "../components/ui/Button";
import UserModal from "../components/users/UserModal";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { usersApi } from "../services/api";
import { useI18n } from "../context/I18nContext";

interface UsersPageProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  assets: Asset[];
  departments: Department[];
  onRefresh: () => Promise<void>;
}

const UsersPage: React.FC<UsersPageProps> = ({
  users,
  assets,
  departments,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<number | "all">("all");
  const [saving, setSaving] = useState(false);

  const openModalForNew = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async (userToSave: User) => {
    setSaving(true);
    try {
      if (editingUser) {
        await usersApi.update(userToSave.id!, userToSave);
      } else {
        await usersApi.create(userToSave);
      }
      
      await onRefresh();
      closeModal();
    } catch (error) {
      console.error("Failed to save user:", error);
      alert("Failed to save user. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (assets.some((a) => a.assignedTo === userId)) {
      alert("Cannot delete user. Please reassign their assets first.");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await usersApi.delete(userId);
        await onRefresh();
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment =
        departmentFilter === "all" || user.departmentId === departmentFilter;
      return matchesSearch && matchesDepartment;
    });
  }, [users, searchTerm, departmentFilter]);
const { t } = useI18n();
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          {t("users.title")}
        </h1>
        <Button  variant="secondary" onClick={openModalForNew}>{t("users.add")}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <div>
          <Input
            label={t("users.search")}
            id="search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Select
            label={t("users.filterDepartment")}
            id="departmentFilter"
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value === "all" ? "all" : Number(e.target.value))
            }
          >
            <option value="all">{t("users.allDepartments")}</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.employeeCount} employees)
              </option>
            ))}
          </Select>
        </div>
      </div>

      <UserTable
        users={filteredUsers}
        assets={assets}
        onEdit={openModalForEdit}
        onDelete={handleDeleteUser}
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveUser}
        user={editingUser}
        departments={departments}
        saving={saving}
      />
    </div>
  );
};

export default UsersPage;