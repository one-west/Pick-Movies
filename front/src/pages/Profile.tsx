import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface User {
  username: string; // 사용자 이름
  email: string; // 이메일
  id: string; // 사용자 고유 ID
  role: string; // 사용자 역할 (USER, ADMIN 등)
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패", error);
    }
  };

  const handleSaveUsernameClick = async () => {
    if (!newUsername) {
      alert("새 사용자 이름을 입력해주세요.");
      return;
    }

    try {
      const updatedUser = { ...user, username: newUsername };
      const response = await axios.put(`/api/user/${updatedUser.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setUser(response.data);
      alert("사용자 이름이 성공적으로 변경되었습니다.");
      setNewUsername("");
      setIsEditingUsername(false);
    } catch (error) {
      console.error("사용자 이름 변경 실패", error);
      alert("사용자 이름 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleSavePasswordClick = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("빈칸을 모두 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const updatedUser = { ...user, newPassword, password: oldPassword };
      const response = await axios.put(`/api/user/${updatedUser.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setUser(response.data);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditingPassword(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          alert("현재 비밀번호가 일치하지 않습니다.");
        } else if (error.status === 404) {
          alert("사용자 인증 정보가 올바르지 않습니다.");
        } else {
          alert("비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
      } else {
        console.error("비밀번호 변경 실패: 서버 응답 없음", error);
        alert("비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  if (!user)
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
          <p className="text-xl font-bold">로딩 중...</p>
        </div>
    );

  return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl font-semibold text-yellow-400 mb-6 text-center">
            🎥 My Movie Profile
          </h1>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">이메일:</p>
              <p className="font-semibold text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">사용자 이름:</p>
              {isEditingUsername ? (
                  <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="새 사용자 이름"
                  />
              ) : (
                  <p className="font-semibold text-lg">{user.username}</p>
              )}
            </div>
            {isEditingUsername ? (
                <div className="flex justify-between mt-3">
                  <button
                      onSubmit={handleSaveUsernameClick}
                      className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                  >
                    저장
                  </button>
                  <button
                      onSubmit={() => setIsEditingUsername(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                  >
                    취소
                  </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsEditingUsername(true)}
                    className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition w-full"
                >
                  사용자 이름 변경
                </button>
            )}
            {isEditingPassword && (
                <>
                  <div>
                    <label className="text-sm text-gray-400">현재 비밀번호:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="현재 비밀번호"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">새 비밀번호:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="새 비밀번호"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">새 비밀번호 확인:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="비밀번호 확인"
                    />
                  </div>
                  <div className="flex justify-between mt-3">
                    <button
                        onClick={handleSavePasswordClick}
                        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                    >
                      저장
                    </button>
                    <button
                        onClick={() => setIsEditingPassword(false)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                    >
                      취소
                    </button>
                  </div>
                </>
            )}
            {!isEditingPassword && (
                <button
                    onClick={() => setIsEditingPassword(true)}
                    className="bg-red-400 text-gray-900 px-4 py-2 rounded-md hover:bg-red-500 transition w-full mt-4"
                >
                  비밀번호 변경
                </button>
            )}
          </div>
          <div className="text-sm text-gray-500 italic mt-6 text-center">
            "Keep enjoying your favorite movies!"
          </div>
        </div>
      </div>
  );
}
