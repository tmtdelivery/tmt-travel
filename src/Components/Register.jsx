import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/vite.svg";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  async function formHandler(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(
      "https://tmtdelivery.onrender.com/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    setLoading(false);
    if (data.msg === "saved") {
      alert("Successfully Registered You can now Log In");
      window.location.href = "/#/login";
    } else {
      alert("User already registered");
    }
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register to a new account
          </h2>
        </div>{" "}
        {loading ? (
          <div className=" mt-1 mb-1 flex justify-center items-center backdrop-filter backdrop-blur-lg">
            <img
              className="animate-ping transform-origin-center w-1/4 h-1/4"
              src={logo}
            />
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={formHandler}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="relative block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="phone-number" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone-number"
                  name="phone"
                  type="number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="phone"
                  required
                  className="relative block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Phone Number"
                />
              </div>
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
                  className="relative block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
        )}
        <div className="flex items-center justify-center">
          <div className="text-sm">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login with Existing Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
