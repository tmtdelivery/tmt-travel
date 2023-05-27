import React from 'react';
import menu from "../../assets/Menu.jpg"
const RestaurantMenu = () => {
  return (
    <div className="flex justify-center items-center my-4">
      <img src={menu} alt="Restaurant Menu"  />
    </div>
  );
};

export default RestaurantMenu;
