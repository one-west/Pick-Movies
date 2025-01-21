import {Link} from "react-router-dom";

export default function Header() {
  return (
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* 좌측 Nav */}
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-yellow-400 mr-8">
              <Link to="/">🎥 Pick Movies</Link>
            </h1>
            <nav className="space-x-7">
              <Link to="/" className="hover:text-yellow-400">Home</Link>
              <Link to="/popular" className="hover:text-yellow-400">Popular Movies</Link>
              <Link to="/upcoming" className="hover:text-yellow-400">Upcoming</Link>
              <Link to="/profile" className="hover:text-yellow-400">Profile</Link>
            </nav>
          </div>
          {/* 우측 Nav */}
          <div className="flex items-center space-x-4">
            <Link to="/signin"
                  className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300">
              Sign In
            </Link>
            <Link
                to="/signup"
                className="px-4 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
  )
      ;
};
