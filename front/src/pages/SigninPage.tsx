import axios, {AxiosError} from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {useAuth} from "../context/AuthContext";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // AuthContext에서 로그인 메서드 가져오기
  const {login} = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("이메일을 입력해주세요.");
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      setError("비밀번호를 입력해주세요.");
      passwordRef.current?.focus();
      return;
    }

    try {
      const response = await axios.post(
          "/api/user/login",
          {email, password},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
      );

      if (response.status === 200) {
        // JWT 액세스 토큰 로컬 스토리지에 저장
        const {accessToken, username} = response.data;
        localStorage.setItem("accessToken", accessToken);

        // AuthContext의 login 메서드 호출
        login(accessToken, username);

        alert("로그인 성공!");

        // 이전 경로로 리다이렉트하거나 기본 경로로 이동
        navigate(location.state?.from || "/", {replace: true});
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          alert("이메일 또는 비밀번호가 잘못되었습니다.");
        } else if (error.response && error.response.status === 500) {
          alert("서버 오류가 발생했습니다. 관리자에게 문의하세요.");
        } else {
          alert("로그인 중 알 수 없는 오류가 발생했습니다.");
        }
      } else {
        alert(error);
      }
    }
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center mb-10">
          <Link to="/" className="text-5xl font-bold text-yellow-400">
            Pick Movies
          </Link>
        </div>
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back!</h1>
          <p className="text-gray-400 text-sm mb-6 text-center">
            Sign in to explore your favorite movies.
          </p>
          <form onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your email"
                  ref={emailRef}
                  onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="password"
              >
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-400"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-yellow-400 hover:underline">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}
