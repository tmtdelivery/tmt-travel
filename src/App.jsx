import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Payment from "./Components/Payment";
import Profile from "./Components/Profile";
import Order from "./Components/Order";
import UserOrders from "./Components/UserOrders";
import UserPayments from "./Components/UserPayments";
import LandingPage from "./Components/UI/LandingPage";
import AboutUs from "./Components/UI/AboutUs";
import HomeNavbar from "./Components/UI/HomeNavbar";
import Footer from "./Components/UI/Footer";
import Team from "./Components/UI/Team";
import Whatsapp from "./Components/UI/Whatsapp";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  return (
    <>
      {loggedIn ? <Navbar user={user} /> : <HomeNavbar />}
      <Routes>
        {!loggedIn && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/team" element={<Team />} />
            <Route
              path="*"
              element={<Login onLogin={handleLogin} setUser={setUser} />}
            />
          </>
        )}
        {loggedIn && (
          <>
            <Route exact path="/user" element={<Home user={user} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payment" element={<Payment user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/order" element={<Order user={user} />} />
            <Route path="/orderdetails" element={<UserOrders user={user} />} />
            <Route
              path="/paymentdetails"
              element={<UserPayments user={user} />}
            />
          </>
        )}
      </Routes>
      <Footer />
      <Whatsapp/>
    </>
  );
}

export default App;
