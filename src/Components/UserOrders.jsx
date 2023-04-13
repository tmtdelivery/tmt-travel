import React, { useEffect, useState } from "react";

function UserOrders({ user }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "https://tmtdelivery.onrender.com/api/getorders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setOrders(data.filter((order) => order.id === user._id));
    };
    fetchOrders();
  }, []);

  return (
    <ul className="p-4">
      <div className="font-bold text-blue-500 text-3xl text-center border-b">
        Your Orders
      </div>
      {orders &&
        orders.map((order) => {
          return (
            <li key={order._id} className="py-4 border-b">
              <div className="flex justify-between items-center">
                <span className="font-semibold mb-1">Date: {order.date}</span>
              </div>
              <div>
                <span className="font-bold">Address: {order.address}</span>
              </div>
              <div
                className="text-gray-500 text-lg font-semibold"
                style={{
                  color: order.delivery === "delivered" ? "green" : "red",
                }}
              >
                Status: {order.delivery}
              </div>
              <div className="text-gray-500 text-md">
                Remarks: {order.remarks}
              </div>
            </li>
          );
        })}

      {orders.length === 0 && (
        <div className="text-center mt-4 font-bold text-lg  min-h-screen">No Orders...</div>
      )}
    </ul>
  );
}

export default UserOrders;
