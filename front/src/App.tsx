import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Profile from "./pages/Profile.tsx";
import MovieDetail from "./pages/MovieDetail.tsx";
import {useEffect, useState} from "react";
import {isTokenExpired, refreshAccessToken} from "./utils/authUtils.ts";
import LoadingScreen from "./components/LoadingScreen.tsx";
import Layout from "./components/Layout.tsx";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      if (isTokenExpired(token)) {
        refreshAccessToken();
      }
    }

    setIsAuthenticated(!!token);
    setLoading(false);
  }, []); // 컴포넌트 마운트 시 실행

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/", element: <Home/>,
        },
        {
          path: "/movies/:movieId",
          element:<MovieDetail isAuthenticated={isAuthenticated}/>
        },
      ]
    },
    {
      path: "/signin", element: <Signin setIsAuthenticated={setIsAuthenticated}/>,
    },
    {
      path: "/signup", element: <Signup/>,
    },
    {
      path: "/profile", element: <ProtectedRoute isAuthenticated={isAuthenticated}><Profile/></ProtectedRoute>
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
