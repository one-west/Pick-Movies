import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { isTokenExpired, refreshAccessToken } from "../utils/authUtils.ts";

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
  username: string; // 필수 속성으로 변경
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(""); // username 상태 추가

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const savedUsername = localStorage.getItem("username"); // 저장된 username 가져오기

      if (token) {
        if (isTokenExpired(token)) {
          const newToken = await refreshAccessToken();
          setIsAuthenticated(!!newToken);
        } else {
          setIsAuthenticated(true);
        }
        if (savedUsername) setUsername(savedUsername); // username 설정
      } else {
        setIsAuthenticated(false);
        setUsername(""); // 로그아웃 상태에서 username 초기화
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token: string, username: string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", username); // username 저장
    setIsAuthenticated(true);
    setUsername(username); // 상태에 username 설정
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username"); // username 삭제
    setIsAuthenticated(false);
    setUsername(""); // username 초기화
    alert("로그아웃 되었습니다.");
  };

  return (
      <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, username }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
