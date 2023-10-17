import FormAddAddress from "../components/FormAddAddress";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AddAddress() {
  const history = useNavigate();

  // useEffect(() => {
  //   const user = localStorage.getItem("token");

  //   if (user != "") history("/login");
  // }, [history]);
  return (
    <div className="w-full flex justify-center items-center ">
      <FormAddAddress />
    </div>
  );
}

export default AddAddress;
