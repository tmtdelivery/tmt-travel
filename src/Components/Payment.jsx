import { useState } from "react";
import logo from "../assets/logo.png";
const includedFeatures = [
  "Get 60 Credits",
  "Worth one month of Food",
  "Lunch and dinner Daily",
  "Save The Credits whenever you dont order",
];

export default function Payment({ user }) {
  const [paymentError, setPaymentError] = useState(null);

  async function handlePayment(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://tmtdelivery.onrender.com/api/createpayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      const options = {
        key: "rzp_test_Tvx2WZQliyyszs",
        amount: `${data.amount}`,
        currency: "INR",
        name: "The Mom Tiffin",
        description: "For 60 Credits of Monthly Membership",
        image: `${logo}`,
        order_id: `${data.id}`,
        handler: async function (response) {
          const request = await fetch(
            `https://tmtdelivery.onrender.com/api/paymentverification/${user._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );
          const data = await request.json();
          if (data.success === true) {
            alert(`Payment Successful with id = ${data.id}`);
            alert(`Updated Credits are ${data.credits}`);
          }
        },
        prefill: {
          name: `${user.name}`,
          email: `${user.email}`,
          contact: `${user.phone}`,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new Razorpay(options);
      razor.open();
      razor.on("payment.failed", function (response) {
        alert(`Payment Failed With Response Code : ${response.error.code}`);
      });
    } catch (error) {
      setPaymentError("An error occurred while processing your payment.");
      console.error(error);
    }
  }
  return (
    <div className="bg-white pb-24 pt-16 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple no-tricks pricing
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Monthly membership
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Get Your Monthly Tiffin By This Membership and Get Rid Off of All The Worries and Distractions Caused By Ordering Your Food.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                What's included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Pay once, for whole month
                </p>
                <p className="mt-4 flex items-baseline justify-center gap-x-2">
                  <span className="text-2xl font-bold tracking-tight text-gray-900 line-through">
                    ₹3,999
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    (25% off)
                  </span>
                </p>
                <p className="mt-2 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    ₹2,999
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    INR
                  </span>
                </p>
                <button
                  onClick={handlePayment}
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Membership
                </button>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
