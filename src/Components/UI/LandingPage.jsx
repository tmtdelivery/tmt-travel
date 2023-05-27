import React from "react";
import food from "../../assets/food.png";
import samosa from "../../assets/samosa.png";
import thali from "../../assets/thali.png";
import painting from "../../assets/painting.png";
import aaloo from "../../assets/Aaloo.png";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div className="bg-gray-100">
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2   items-center">
              <div className="px-6 lg:px-0">
                <h1 className="text-4xl font-bold mb-6">
                  Hungry? Get food delivered right to your location
                </h1>
                <p className="text-lg mb-8">
                  Choose from a wide range of cuisines and deliver to your home
                  or work. Get the monthly membership of the tiffin service
                </p>
                <div className="flex">
                  <Link
                    to="/register"
                    className="bg-yellow-500 rounded-md px-6 py-4 font-bold hover:bg-yellow-600 transition duration-300"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
              <div className="mt-7 lg:mt-0 md:mt-0">
                <img
                  src={painting}
                  alt="Food delivery"
                  className=""
                />
              </div>
              
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-center">
              <div className="bg-white rounded-lg overflow-hidden shadow-md ">
                <img
                  src={aaloo}
                  alt="Restaurant"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">
                    One Time Membership For a Month
                  </h3>
                  <p className="text-gray-700 mb-4">Worth 60 Credits</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-bold">
                      Costs Only 1 Credit / Meal (Lunch or Dinner)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md ">
                <img
                  src={food}
                  alt="Restaurant"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">
                    Deliver Food To Your Location
                  </h3>
                  <p className="text-gray-700 mb-4">Work or Home </p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-bold">
                      You will choose where to deliver on the portal
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md ">
                <img
                  src={samosa}
                  alt="Restaurant"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">
                    Charged only if ordered
                  </h3>
                  <p className="text-gray-700 mb-4">from the portal </p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-bold">
                      Otherwise the credits will remain in your account
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md ">
                <img
                  src={thali}
                  alt="Restaurant"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">On Time Delivery</h3>
                  <p className="text-gray-700 mb-4">of the food </p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-bold">
                      Lunch (12:00pm to 01:00pm ) Dinner (07:30pm to 08:30pm).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
