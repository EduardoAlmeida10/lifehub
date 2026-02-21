"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { loginRequest } from "@/api/auth.api";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined"
        ? localStorage.getItem("lifehub.token")
        : null;

    if (storedToken) {
      setToken(storedToken);
    }

    setInitialized(true);
  }, []);

  async function login(email: string, password: string) {
    const response = await loginRequest({ email, password });

    const accessToken = response.access_token;

    localStorage.setItem("lifehub.token", accessToken);
    setToken(accessToken);
  }

  function logout() {
    localStorage.removeItem("lifehub.token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        initialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
