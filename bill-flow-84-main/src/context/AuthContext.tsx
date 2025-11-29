import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "admin" | "user";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ⭐ NEW loading state
  const navigate = useNavigate();

  // ⭐ Restore user from localStorage on refresh
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse stored user", err);
      localStorage.removeItem("user");
    }
    setLoading(false); // ⭐ Important: allow ProtectedRoute to continue
  }, []);

  // ⭐ LOGIN FUNCTION
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      const loggedUser = data.user;

      // ⚠ Role must match selected login type
      if (loggedUser.role !== role) return false;

      const userData: User = {
        id: loggedUser._id,
        email: loggedUser.email,
        name: loggedUser.name,
        role: loggedUser.role,
      };

      // Save to memory + localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect
      if (userData.role === "admin") navigate("/admin/dashboard");
      else navigate("/user/billing");

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // ⭐ LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading, // ⭐ expose loading for ProtectedRoute
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
