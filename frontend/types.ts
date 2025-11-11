export enum AssetStatus {
  InUse = "In Use",
  InStorage = "In Storage",
  InRepair = "In Repair",
  Decommissioned = "Decommissioned",
}

export enum AssetCategory {
  Laptop = "Laptop",
  Desktop = "Desktop",
  Monitor = "Monitor",
  Phone = "Phone",
  Tablet = "Tablet",
  Keyboard = "Keyboard",
  Mouse = "Mouse",
  Printer = "Printer",
  Server = "Server",
  NetworkDevice = "Network Device",
  Other = "Other",
}

export interface AssetHistory {
  id: number;
  date: string;
  status: AssetStatus;
  userId?: number;
  notes?: string;
}

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  status: AssetStatus;
  purchaseDate: string;
  assignedTo?: number;
  notes?: string;
  vendor: string;
  warrantyExpiry?: string;
  specs?: string;
  history: AssetHistory[];
}

export interface Department {
  id: number;
  name: string;
  employeeCount: number;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  departmentId: number;
  departmentName?: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  fullName: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: LoginResponse | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<LoginResponse>) => void;
  loading: boolean;
}