export default function LoadingScreen() {
  return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500 border-solid mb-4"></div>
          <p className="text-lg font-semibold">Loading your favorite movies...</p>
          {/* 영화 관련 메시지 */}
          <p className="text-sm mt-2 text-gray-400 italic">
            "Great movies are worth the wait!"
          </p>
        </div>
      </div>
  );
}
