  
  
import React, { useState, useMemo } from "react";
import type { Department, User } from "../../types";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { departmentsApi } from "../services/api";
import DepartmentTable from "../components/departments/DepartmentTable";
import DepartmentModal from "../components/departments/DepartmentModal";

interface DepartmentsPageProps {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  users: User[];
  onRefresh: () => Promise<void>;
}

const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  departments,
  users,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);

  const openModalForNew = () => {
    setEditingDepartment(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (dept: Department) => {
    setEditingDepartment(dept);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  };

  const handleSaveDepartment = async (deptData: Partial<Department>) => {
    setSaving(true);
    try {
      if (editingDepartment) {
        await departmentsApi.update(editingDepartment.id, deptData);
      } else {
        const { id, employeeCount, ...newDepartment } = deptData as Department;
        await departmentsApi.create(newDepartment);
      }
      
      await onRefresh();
      closeModal();
    } catch (error) {
      console.error("Failed to save department:", error);
      alert("Failed to save department. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDepartment = async (deptId: number) => {
    const dept = departments.find(d => d.id === deptId);
    
    if (dept && dept.employeeCount > 0) {
      alert(`Cannot delete ${dept.name}. Please reassign ${dept.employeeCount} employee(s) first.`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${dept?.name}?`)) {
      try {
        await departmentsApi.delete(deptId);
        await onRefresh();
      } catch (error) {
        console.error("Failed to delete department:", error);
        alert("Failed to delete department. Please try again.");
      }
    }
  };

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          Manage Departments
        </h1>
        <Button variant="secondary"  onClick={openModalForNew}>Add New Department</Button>
      </div>

      <div className="mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <Input
          label="Search Departments"
          id="search"
          placeholder="Search by department name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DepartmentTable
        departments={filteredDepartments}
        users={users}
        onEdit={openModalForEdit}
        onDelete={handleDeleteDepartment}
      />

      <DepartmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveDepartment}
        department={editingDepartment}
        saving={saving}
      />
    </div>
  );
};

export default DepartmentsPage;