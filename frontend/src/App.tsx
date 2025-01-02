import './App.css'
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path: "/contact",
      element: <Contact/>
    }
  ])
  return (
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
  );
}

export default App;
