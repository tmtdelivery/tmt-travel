import React, { useState, useEffect } from "react";
import logo from "../assets/vite.svg";
function UserPayments({ user }) {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPayments = async () => {
      const response = await fetch(
        "https://tmtdelivery.onrender.com/api/getpayments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPayments(data.filter((payment) => payment.user_id === user._id));
      setIsLoading(false);
    };
    fetchPayments();
  }, []);

  if (isLoading) {
    return (
      <div className=" mt-1 mb-1 flex justify-center items-center backdrop-filter backdrop-blur-lg">
        <img
          className="animate-ping transform-origin-center w-1/4 h-1/4"
          src={logo}
        />
      </div>
    );
  }
  return (
    <ul className="p-4">
      <div className="font-bold text-blue-500 text-3xl text-center border-b">
        Your Payments
      </div>
      {payments &&
        payments.map((payment) => {
          return (
            <li key={payment._id} className="py-4 border-b">
              <div className="flex justify-between items-center">
                <span className="font-bold">
                  <span className="font-semibold text-gray-500">Date: </span>
                  {payment.date}
                </span>
              </div>
              <div>
                <span className="font-bold mb-1">
                  <span className="font-semibold text-gray-500">
                    {" "}
                    Order Id:{" "}
                  </span>
                  {payment.razorpay_order_id}
                </span>
              </div>
              <div>
                <span className="font-bold">
                  <span className="font-semibold text-gray-500">
                    Payment Id:{" "}
                  </span>
                  {payment.razorpay_payment_id}
                </span>
              </div>
              <div>
                <span className="font-bold">
                  <span className="font-semibold text-gray-500">
                    Payment Signature:{" "}
                  </span>
                  {payment.razorpay_signature}
                </span>
              </div>
            </li>
          );
        })}

      {payments.length === 0 && (
        <div className="text-center mt-4 font-bold text-lg">
          No Payments Done Yet...
        </div>
      )}
    </ul>
  );
}

export default UserPayments;
