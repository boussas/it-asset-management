import React, { useState, useEffect } from "react";
import type { Department } from "../../../types";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (department: Partial<Department>) => void;
  department: Department | null;
  saving?: boolean;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  department,
  saving = false,
}) => {
  const [formData, setFormData] = useState<Partial<Department>>({ name: "" });

  useEffect(() => {
    if (department) {
      setFormData({ name: department.name });
    } else {
      setFormData({ name: "" });
    }
  }, [department, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={department ? "Edit Department" : "Add New Department"}
    >
      <div className="space-y-4">
        <Input
          label="Department Name"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          required
          placeholder="e.g., Engineering, Marketing, Sales"
        />
        <div className="pt-4 flex justify-end">
          <Button onClick={handleSubmit} disabled={saving}  variant="secondary" >
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
            ) : department ? (
              "Save Changes"
            ) : (
              "Create Department"
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DepartmentModal;