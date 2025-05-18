// AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AdminRoute = () => {
  const { user } = useAuth();
  return user?.tipo === "admin" ? <Outlet /> : <Navigate to="/dashboard" />;
};
