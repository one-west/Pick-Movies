import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // 인증 정보 가져오기
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // 또는 로딩 화면
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
}
