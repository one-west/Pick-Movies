import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SigninPage from "./pages/SigninPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import MovieDetailPage from "./pages/MovieDetailPage.tsx";
import {useEffect, useState} from "react";
import {isTokenExpired, refreshAccessToken} from "./utils/authUtils.ts";
import LoadingScreen from "./components/LoadingScreen.tsx";
import Layout from "./components/Layout.tsx";
import SearchPage from "./pages/SearchPage.tsx";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        if (isTokenExpired(token)) {
          const newToken = await refreshAccessToken();
          setIsAuthenticated(!!newToken);

        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();

  }, []); // 컴포넌트 마운트 시 실행

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/", element: <HomePage/>,
        },
        {
          path: "/movies/:movieId",
          element: <MovieDetailPage isAuthenticated={isAuthenticated}/>
        },
        {
          path: "/search",
          element: <SearchPage />
        },
      ]
    },
    {
      path: "/signin", element: <SigninPage setIsAuthenticated={setIsAuthenticated}/>,
    },
    {
      path: "/signup", element: <SignupPage/>,
    },
    {
      path: "/profile", element: <ProtectedRoute isAuthenticated={isAuthenticated}><ProfilePage/></ProtectedRoute>
    }
  ]);

  return loading ? (
      <LoadingScreen/>
  ) : (
      <div className="App">
        <RouterProvider router={router}/>
      </div>
  );
}
