
import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext(undefined);

const MOCK_USERS = [
  { email: "manager@slooze.com", password: "password", role: "manager" },
  { email: "keeper@slooze.com", password: "password", role: "keeper" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const loginUser = { email, role: found.role };
      setUser(loginUser);
      localStorage.setItem("auth_user", JSON.stringify(loginUser));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
