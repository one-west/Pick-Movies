import {Navigate} from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

// 로그인하지 않은 경우, 특정페이지 접근 막음
export default function ProtectedRoute({isAuthenticated, children}: ProtectedRouteProps) {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/signin"/>;
  }
};

