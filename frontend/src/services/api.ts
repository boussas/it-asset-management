import type { Asset, User, AssetStatus, Department, LoginRequest, LoginResponse } from "../../types";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

  
const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

  
export const setAuthToken = (token: string): void => {
  localStorage.setItem("authToken", token);
};

  
export const removeAuthToken = (): void => {
  localStorage.removeItem("authToken");
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 401) {
        
      removeAuthToken();
      window.location.href = "/";
    }
    const errorText = await response.text();
    throw new ApiError(response.status, errorText || response.statusText);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
};

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, "Invalid username or password");
    }
    
    return response.json();
  },
};

export const assetsApi = {
  async getAll(search?: string, status?: AssetStatus): Promise<Asset[]> {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (status && status !== "all") params.append("status", status);

    const url = `${API_BASE_URL}/assets${params.toString() ? `?${params}` : ""}`;
    const response = await fetch(url, {
      headers: getHeaders(),
    });
    return handleResponse<Asset[]>(response);
  },

  async getById(id: string): Promise<Asset> {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse<Asset>(response);
  },

  async create(asset: Partial<Asset>): Promise<Asset> {
    const cleanedAsset = {
      ...asset,
      assignedTo: asset.assignedTo || null,
    };

    const response = await fetch(`${API_BASE_URL}/assets`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(cleanedAsset),
    });
    return handleResponse<Asset>(response);
  },

  async update(id: string, asset: Asset): Promise<Asset> {
    const cleanedAsset = {
      ...asset,
      assignedTo: asset.assignedTo || null,
    };

    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(cleanedAsset),
    });
    return handleResponse<Asset>(response);
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse<void>(response);
  },
};

  
export const usersApi = {
  async getAll(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: getHeaders(),
    });
    return handleResponse<User[]>(response);
  },

  async getById(id: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse<User>(response);
  },

  async create(user: Omit<User, "id">): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(user),
    });
    return handleResponse<User>(response);
  },

  async update(id: number, user: User): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(user),
    });
    return handleResponse<User>(response);
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse<void>(response);
  },
};

export const departmentsApi = {
  async getAll(): Promise<Department[]> {
    const response = await fetch(`${API_BASE_URL}/departments`, {
      headers: getHeaders(),
    });
    return handleResponse<Department[]>(response);
  },

  async getById(id: number): Promise<Department> {
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse<Department>(response);
  },

  async create(department: Omit<Department, "id" | "employeeCount">): Promise<Department> {
    const response = await fetch(`${API_BASE_URL}/departments`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(department),
    });
    return handleResponse<Department>(response);
  },

  async update(id: number, department: Partial<Department>): Promise<Department> {
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(department),
    });
    return handleResponse<Department>(response);
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse<void>(response);
  },
};