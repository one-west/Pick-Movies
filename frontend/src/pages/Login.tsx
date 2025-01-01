import React, {useState} from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/user', {email, password});
      console.log('Login successful:', response.data);
    } catch (error) {

      console.error('Login failed:', error);
    }
  }
  return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            id:
            <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // 이메일 값 관리
            />
          </div>
          <div>
            pw:
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // 비밀번호 값 관리
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
  )
}