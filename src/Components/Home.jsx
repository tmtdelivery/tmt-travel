import React, { useState, useEffect } from "react";
import clock from "../assets/clock.svg";
import coins from "../assets/coins.svg";
import { Link } from "react-router-dom";

function Home({ user }) {
  const [payment, setPayment] = useState(false);
  const [canOrder, setCanOrder] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const features = [
    { name: "🏠 Home Address", description: `${user.homeAddress}` },
    {
      name: "💼 Alternate Address",
      description: `${user.alternateAddress}`,
    },
    { name: "📧 Email", description: `${user.email}` },
    {
      name: "📱 Phone Number",
      description: `+91 ${user.phone}`,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const currentTime = date.getTime();
      const time = date.toISOString().slice(0, 11);

      const date1 = new Date(`${time}05:00:00`).getTime();
      const date2 = new Date(`${time}10:00:00`).getTime();
      const date3 = new Date(`${time}15:00:00`).getTime();
      const date4 = new Date(`${time}18:00:00`).getTime();
      if (user.credits === 0) {
        setPayment(true);
        setCanOrder(false);
      }
      if (
        (currentTime >= date1 && currentTime <= date2) ||
        (currentTime >= date3 && currentTime <= date4)
      ) {
        setCanOrder(true);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let remainingHours = 0;
        let remainingMinutes = 0;
        if (hours >= 5 && hours < 10) {
          remainingHours = 10 - hours - 1;
          remainingMinutes = 60 - minutes;
        } else if (hours >= 15 && hours < 18) {
          remainingHours = 18 - hours - 1;
          remainingMinutes = 60 - minutes;
        } else {
          setCanOrder(false);
          setRemainingTime("");
          return;
        }
        setRemainingTime(`${remainingHours}h ${remainingMinutes}m`);
      } else {
        setCanOrder(false);
        setRemainingTime("");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [user]);

  return (
    <div className="bg-white rounded-md">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-1 lg:px-8">
        <div>
          <div className="flex flex-row justify-between flex-wrap items-center gap-y-7">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Hi, {user.name}
            </h1>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl flex items-center gap-x-2">
              <img className="w-8" src={coins} alt="Coins" />
              <span>{user.credits} Credits</span>
            </h2>
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 sm:gap-y-7 lg:gap-x-10">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="rounded-md shadow-md border-gray-200 overflow-hidden"
              >
                <dt className="font-bold text-lg border-b py-4 px-6 bg-gray-100">
                  {feature.name}
                </dt>
                <dd className="py-4 px-6 text-lg text-gray-600">
                  {feature.description === "" ? (
                    <Link
                      to="/profile"
                      className="hover:cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Add+
                    </Link>
                  ) : (
                    feature.description
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>{" "}
        {canOrder && (
          <div className="mt-10">
            <p className="text-lg font-medium mb-2">
              Order Now! Only{" "}
              <span className="text-red-500 font-bold">{remainingTime}</span>{" "}
              Left
            </p>
            <Link
              to="/order"
              className="hover:cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Order Now
            </Link>
          </div>
        )}
        {!canOrder && (
          <div className="flex flex-row items-center mt-14 justify-center gap-3">
            <img className="w-10 display-inline" src={clock} alt="clock" />
            <span className="text-red-500 font-medium text-2xl">
              Time Up For This Meal Wait For the Next One
            </span>
          </div>
        )}
        {payment && (
          <div className="mt-5 flex justify-center">
            <Link
              to="/payment"
              className="hover:cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            >
              ₹ Pay Now To Make Your Order
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
