import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/signin",
      element: <Signin/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
  ])
  return (
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
  );
}
