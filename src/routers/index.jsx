import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Address from "../pages/Address";
import AddAddress from "../pages/AddAddress";
import EditAddress from "../pages/EditAddress";
import Login from "../pages/Login";
const Routers = () => {
  // const user = localStorage.getItem("token");

  return (
    <div className="container">
      <Routes>
        <Route path="/*" element={<Home />} />
        {/* <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/address" element={<Address />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/address/:addressId" element={<EditAddress />} />
      </Routes>
    </div>
  );
};

export default Routers;
