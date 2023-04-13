import React from "react";

function AboutUs() {
  return (
    <>
      <div className="bg-gray-100">
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              About Us
            </h1>
            <p className="text-gray-700 text-center leading-loose mb-8">
              We are a team of food lovers who are passionate about bringing
              delicious and healthy food to your doorstep.
            </p>
            <div className="flex flex-wrap -mx-4 lg:mb-20 sm:mb-7">
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 h-full">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Our Mission
                  </h2>
                  <p className="text-gray-700 leading-loose">
                    Our mission is to provide the highest quality food and
                    service to our customers, while promoting a healthy and
                    sustainable lifestyle. We strive to create a community of
                    food lovers who share our passion for delicious and
                    nutritious food.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 h-full">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Our Story
                  </h2>
                  <p className="text-gray-700 leading-loose">
                    Our journey began with a simple idea: to make it easy for
                    people to enjoy healthy and delicious food without leaving
                    their homes. Over the years, we've grown and evolved, but
                    our commitment to quality and service has never wavered.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 h-full">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Our Team
                  </h2>
                  <p className="text-gray-700 leading-loose">
                    We are a diverse and passionate team of foodies, chefs, and
                    delivery experts who are dedicated to making your food
                    experience the best it can be. We work hard every day to
                    ensure that you receive the highest quality food and
                    service, and we're always looking for ways to improve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 py-8">
          <div className="container mx-auto px-4">
            <p className="text-gray-400 text-center">
              © 2023 Tmt Delivery. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
