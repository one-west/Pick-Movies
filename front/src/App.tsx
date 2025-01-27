import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SigninPage from "./pages/SigninPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import MovieDetailPage from "./pages/MovieDetailPage.tsx";
import Layout from "./components/Layout.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import UpcomingPage from "./pages/UpcomingPage.tsx";
import PopularPage from "./pages/PopularPage.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {path: "/", element: <HomePage/>},
        {path: "/movies/:movieId", element: <MovieDetailPage/>},
        {path: "/search", element: <SearchPage/>},
        {path: "/popular", element: <PopularPage/>},
        {path: "/upcoming", element: <UpcomingPage/>},
      ],
    },
    {path: "/signin", element: <SigninPage/>},
    {path: "/signup", element: <SignupPage/>},
    {
      path: "/profile",
      element: (
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
      ),
    },
  ]);

  return (
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
  );
}
