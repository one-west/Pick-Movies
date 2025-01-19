export default function Profile() {
  // 기존 코드 유지

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
        "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/user/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      alert("계정이 성공적으로 삭제되었습니다.");
      localStorage.removeItem("accessToken"); // 토큰 삭제
      setUser(null); // 사용자 데이터 초기화
      window.location.href = "/"; // 메인 페이지로 리디렉션
    } catch (error) {
      console.error("회원 탈퇴 실패", error);
      alert("회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          {/* 기존 컴포넌트 유지 */}
          <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full mt-4"
          >
            회원 탈퇴
          </button>
        </div>
      </div>
  );
}
