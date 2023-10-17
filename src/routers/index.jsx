import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Address from "../pages/Address";
import AddAddress from "../pages/AddAddress";
import EditAddress from "../pages/EditAddress";
import Login from "../pages/Login";
const Routers = () => {
  const user = localStorage.getItem("token");
  // Tạo biến user để tiện kiểm tra cho việc đã login hay chưa, nếu đã login thì sẽ dẫn tới "/" là trang home,
  //còn chưa login thì sẽ tự động tới "/login"
  return (
    <div className="container">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/address"
          element={user ? <Address /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-address"
          element={user ? <AddAddress /> : <Navigate to="/login" />}
        />
        <Route
          path="/address/:addressId"
          element={user ? <EditAddress /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default Routers;
