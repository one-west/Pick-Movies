import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "./Footer.tsx";

export default function Layout() {
  return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
  )
}