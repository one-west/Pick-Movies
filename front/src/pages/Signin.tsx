import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";

export default function Signin({setIsAuthenticated}: { setIsAuthenticated: (auth: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
      const response = await axios.post('/api/login', {email, password});
      // JWT 액세스 토큰 로컬 스토리지에 저장
      localStorage.setItem("accessToken", response.data.accessToken);

      if (email === response.data.email && password === response.data.password) {
        setIsAuthenticated(true); // 로그인 상태 업데이트
        navigate("/profile"); // 마이페이지로 이동
        alert("로그인 성공!");
      } else {
        alert("로그인 실패. 다시 시도해주세요");
      }

    } catch (error) {
      alert("로그인 실패. 다시 시도해주세요.");
    }
  }
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
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your email"
                  ref={emailRef}
                  onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your password"
                  ref={passwordRef}
                  onChange={event => setPassword(event.target.value)}
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