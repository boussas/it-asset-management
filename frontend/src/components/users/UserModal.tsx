import React, { useState, useEffect } from "react";
import { type User, type Department } from "../../../types";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { generateAvatar } from "../../utils/avatar";


interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: User | null;
  departments: Department[];
  saving?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
  departments,
  saving = false,
}) => {
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        name: "",
        email: "",
        departmentId: departments.length > 0 ? departments[0].id : 0,
      });
    }
  }, [user, isOpen, departments]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "departmentId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as User);
  };

  const { initials, bgColor } = generateAvatar(formData.name || "");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Edit User" : "Add New User"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />
        <Select
          label="Department"
          id="departmentId"
          name="departmentId"
          value={formData.departmentId || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name} ({dept.employeeCount} employees)
            </option>
          ))}
        </Select>

        <div className="flex justify-center pt-2">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold text-white"
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={saving} variant="secondary">
            {saving ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : user ? (
              "Save Changes"
            ) : (
              "Create User"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;
