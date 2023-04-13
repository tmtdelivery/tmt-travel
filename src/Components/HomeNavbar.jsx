import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const HomeNavbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <Link
              className="text-gray-800 font-bold text-xl hover:text-gray-700"
              to="/"
            >
              <img className="h-14 w-auto" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="lg:block flex items-center ">
              <Link
                className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                to="/aboutus"
              >
                About Us
              </Link>
            </div>

            <div className="flex justify-end md:flex-1">
              <Link
                className="text-black-500 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-yellow-500  hover:bg-yellow-400 rounded-md px-3 py-2 text-sm font-medium"
                to="/register"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
