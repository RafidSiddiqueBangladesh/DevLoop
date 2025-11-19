import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

type User = {
  id: string;
  email: string;
  fullName?: string;
  householdSize?: number;
  dietaryPreferences?: string;
  location?: string;
  monthlyBudget?: number;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    fullName?: string;
    email: string;
    password: string;
    householdSize?: number | string;
    dietaryPreferences?: string;
    location?: string;
    monthlyBudget?: number | string;
  }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
      // Try to load profile when token exists
      refreshProfile().catch(() => {});
    } else {
      localStorage.removeItem("auth_token");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiFetch<{ user: User; token: string; message?: string }>(
        "/api/auth/login",
        { method: "POST", body: JSON.stringify({ email, password }) },
      );
      setUser(res.user);
      setToken(res.token);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: {
    fullName?: string;
    email: string;
    password: string;
    householdSize?: number | string;
    dietaryPreferences?: string;
    location?: string;
    monthlyBudget?: number | string;
  }) => {
    setLoading(true);
    try {
      const res = await apiFetch<{ user: User; token: string }>(
        "/api/auth/register",
        { method: "POST", body: JSON.stringify(payload) },
      );
      setUser(res.user);
      setToken(res.token);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const refreshProfile = async () => {
    if (!token) return;
    const res = await apiFetch<{ user: User }>("/api/auth/profile", { method: "GET" }, token);
    setUser(res.user);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!token) throw new Error("Not authenticated");
    const res = await apiFetch<{ user: User; message?: string }>(
      "/api/auth/profile",
      { method: "PUT", body: JSON.stringify(updates) },
      token,
    );
    setUser(res.user);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, loading, login, register, logout, refreshProfile, updateProfile }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}