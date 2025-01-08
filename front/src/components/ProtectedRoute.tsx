import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactElement;
}

// 로그인하지 않은 경우, 특정페이지 접근 막음
export default function ProtectedRoute({isAuthenticated, children}: ProtectedRouteProps) {

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace/>;
  }
  return children;
};

