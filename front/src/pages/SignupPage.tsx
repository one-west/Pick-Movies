import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {username, email, password, confirmPassword} = formData;

    if (!username) {
      setError("이름을 입력해주세요.");
      usernameRef.current?.focus();
      return;
    }

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

    if (!confirmPassword) {
      setError("비밀번호 확인을 입력해주세요.");
      confirmPasswordRef.current?.focus();
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      confirmPasswordRef.current?.focus();
      return;
    }

    try {
      const response = await axios.post("/api/user", {email, password, username});
      if (response.status === 201) {
        alert("회원가입 성공!");
        navigate("/signin")
      }
    } catch (error) {
      alert(`API 호출 에러: ${error}`);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Join Us!</h1>
          <p className="text-gray-400 text-sm mb-6 text-center">
            Sign up to start your movie journey.
          </p>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="username">
                Name
              </label>
              <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your name"
                  value={formData.username}
                  onChange={handleChange}
                  ref={usernameRef}
              />
            </div>
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
                  value={formData.email}
                  onChange={handleChange}
                  ref={emailRef}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  ref={passwordRef}
              />
            </div>
            <div className="mb-6">
              <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  ref={confirmPasswordRef}
              />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-400"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <a href="/front/src/pages/SigninPage" className="text-yellow-400 hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
  );
}
