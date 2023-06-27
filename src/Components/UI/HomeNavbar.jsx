import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import profile from "../../assets/profile.svg";

const HomeNavbar = () => {
  const userFromStorage = localStorage.getItem("user");
  const user = userFromStorage ? JSON.parse(userFromStorage) : null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          <div>
            <Link
              className="flex flex-row items-center text-gray-800 font-bold text-xl hover:text-gray-700"
              to="/"
            >
              <img className="h-14 w-auto mr-3" src={logo} alt="logo" />
              <h1 className="hidden lg:block md:block">The Mom's Tiffin</h1>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <Link
                className="hidden md:block lg:block text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                to="/"
              >
                Home
              </Link>
              <Link
                className="block text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                to="/menu"
              >
                Menu
              </Link>
              <Link
                className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                to="/aboutus"
              >
                Team
              </Link>
            </div>

            <div className="flex justify-end md:flex-1">
              {user ? (
                <Link
                  className="flex items-center text-black-500 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                  to="/profile"
                >
                  <div className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <div className="rounded-full bg-blue-500 text-white font-bold text-md py-2 px-2">
                      {user.name.split(" ")[0]}
                    </div>
                  </div>
                </Link>
              ) : (
                <>
                  <Link
                    className="text-black-500 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="bg-yellow-500 hover:bg-yellow-400 rounded-md px-3 py-2 text-sm font-medium"
                    to="/register"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
