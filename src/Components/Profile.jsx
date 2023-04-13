import { useState } from "react";
import home from "../assets/home.svg";
import office from "../assets/office.svg";
import profile from "../assets/profile.svg";
import phone from "../assets/phone.svg";
function Profile({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    homeAddress: user.homeAddress,
    alternateAddress: user.alternateAddress,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:4000/api/users/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    if (data.message === "User updated") {
      alert("Profile Updated Successfully");
    } else {
      alert("Internal Error");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Update Your Details Here</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img className="w-6 text-gray-500" src={profile} alt="profile" />
            </div>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-14 mr-20 pr-10 text-gray-900 ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              autoComplete="name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img className="w-6 text-gray-500" src={phone} alt="phone" />
            </div>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-14 mr-20 pr-10 text-gray-900 ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="phone"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              autoComplete="phone"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="home">
            Home Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img className="w-6 text-gray-500" src={home} alt="phone" />
            </div>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-14 mr-20 pr-10 text-gray-900 ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="home"
              type="text"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              placeholder="Home Address"
              autoComplete="address"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="alternate"
          >
            Work Address / Alternate Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img className="w-6 text-gray-500" src={office} alt="phone" />
            </div>
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-14 mr-20 pr-10 text-gray-900 ring-1 ring-inset ring-green-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="alternate"
              type="text"
              name="alternateAddress"
              value={formData.alternateAddress}
              onChange={handleChange}
              placeholder="Work Address"
              autoComplete="address"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="mt-3 group relative flex w-full justify-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update Profile
          </button>
        </div>
      </div>
    </form>
  );
}

export default Profile;
