// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // optional loading screen

  if (!user) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute; // ✅ default export
