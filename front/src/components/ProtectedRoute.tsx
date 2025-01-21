import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactElement;
}

export default function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/signin", { state: { from: location.pathname } });
    }
  }, [isAuthenticated]);

  // 인증되지 않은 경우 리디렉션 중이므로 null 반환
  if (!isAuthenticated) {
    return null;
  }

  // 인증된 경우 자식 컴포넌트를 렌더링
  return children;
}
