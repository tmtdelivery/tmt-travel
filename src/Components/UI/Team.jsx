import React from "react";
import suraj from "../../assets/suraj.png";
import dheeraj from "../../assets/Dheeraj.png";
function Team() {
  return (
    <>
      <div className="bg-gray-100">
        <div className="bg-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Meet Our Team
            </h1>
            <div className="flex flex-wrap -mx-4 lg:mb-10 sm:mb-7 justify-center gap-x-14 gap-y-10">
              <div className="h-full w-full md:w-1/2 lg:w-1/3 px-4 filter grayscale hover:grayscale-0  rounded-xl">
                <div className="bg-white border border-gray-300 shadow-lg rounded-xl  h-full">
                  <div className="relative">
                    <img src={suraj} className="w-full  rounded-xl" />
                    <span className="absolute bottom-0 left-0 right-0 p-2 pt-4 text-white font-medium text-center text-xs bg-gradient-to-t from-gray-900 to-transparent rounded-xl">
                      <h2 className="text-2xl font-bold underline">Suraj</h2>
                      <p className="text-sm">CEO and Co-Founder</p>
                      <p>First year student</p>
                      <p>Pursuing BMS at Shaheed Sukhdev College of Business Studies</p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-full w-full md:w-1/2 lg:w-1/3 px-4 filter grayscale hover:grayscale-0  rounded-xl">
                <div className="bg-white border border-gray-300 shadow-lg rounded-xl  h-full">
                  <div className="relative">
                    <img src={dheeraj} className="w-full  rounded-xl" />
                    <span className="absolute bottom-0 left-0 right-0 p-3 pb-2 pt-4 text-white font-medium text-center text-xs bg-gradient-to-t from-gray-900 to-transparen rounded-xl">
                      {" "}
                      <h2 className="text-2xl font-bold underline">Dheeraj</h2>
                      <p className="text-sm">Co-Founder</p>
                      <p>First year student</p>
                      <p>Pursuing BMS at Shaheed Sukhdev College of Business Studies</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;
