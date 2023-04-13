import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/vite.svg";

function Login(props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  async function formHandler(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("https://tmtdelivery.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setLoading(false);
    if (data.message === "valid") {
      props.onLogin(true);
      props.setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/#/user";
    } else {
      alert("Incorrect Details");
    }
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {loading ? (
          <div className=" mt-1 mb-1 flex justify-center items-center backdrop-filter backdrop-blur-lg">
            <img
              className="animate-ping transform-origin-center w-1/4 h-1/4"
              src={logo}
            />
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={formHandler}>
            <div className="-space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        )}
        <div className="flex items-center justify-center mt-4">
          <div className="text-sm">
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Register a new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
