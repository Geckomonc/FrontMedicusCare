// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderizar el componente hijo
  return children;
}

export default ProtectedRoute;
