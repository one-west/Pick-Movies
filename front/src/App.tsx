import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {useState} from "react";
import Profile from "./pages/Profile.tsx";
import MovieDetail from "./pages/MovieDetail.tsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태 관리

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/signin",
      element: <Signin setIsAuthenticated={setIsAuthenticated}/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/profile",
      element: (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Profile/>
          </ProtectedRoute>
      )
    },
    {
      path: "/movies/:movieId",
      element: <MovieDetail />,
    },
  ])
  return (
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
  );
}
