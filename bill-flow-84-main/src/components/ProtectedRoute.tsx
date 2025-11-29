import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();

  // ⏳ Wait until AuthContext loads stored user
  if (loading) {
    return <div className="p-4 text-center text-lg">Loading...</div>;
  }

  // ❌ Not logged in → go to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Role mismatch → redirect to correct home page
  if (requiredRole && user.role !== requiredRole) {
    const redirectPath =
      user.role === "admin" ? "/admin/dashboard" : "/user/billing";

    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
