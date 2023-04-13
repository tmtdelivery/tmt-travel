import React, { useState, useEffect } from "react";

function Order({ user }) {
  const [canOrder, setCanOrder] = useState(false);
  const [formData, setFormData] = useState({
    id: user._id,
    name: user.name,
    phone: user.phone,
    address: user.homeAddress,
    date: new Date().toDateString(),
    delivery: "not delivered",
    remarks: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  async function handleSubmit(e) {
    window.confirm("Are the details correct");
    e.preventDefault();
    const response = await fetch("https://tmtdelivery.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.msg === "Order placed") {
      alert("Order Placed Sucessfully");
      localStorage.removeItem("user");
      window.location.href = "/#/login";
    }
    console.log(data);
  }
  useEffect(() => {
    if (user.credits > 0) {
      setCanOrder(true);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Place Your Order</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 font-semibold mb-2"
              >
                Delivery Address
              </label>
              <select
                name="address"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
                value={formData.address}
                onChange={handleChange}
                required
              >
                <option value={user.homeAddress}>{user.homeAddress}</option>
                <option value={user.alternateAddress}>
                  {user.alternateAddress}
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="remarks"
                className="block text-gray-700 font-semibold mb-2"
              >
                Remarks
              </label>
              <input
                name="remarks"
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-300"
                value={formData.remarks}
                onChange={handleChange}
              />
            </div>
            <div className="text-right">
              {canOrder ? (
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
                >
                  Order Now
                </button>
              ) : (
                <span className="text-red-500 font-semibold">
                  Time Range Not Valid Or No Credits Available
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
