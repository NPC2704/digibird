import React, { useEffect } from "react";
import FormEditAddress from "../components/FormEditAddress";
import { useNavigate } from "react-router-dom";
function EditAddress() {
  const history = useNavigate();
  // useEffect(() => {
  //   const user = localStorage.getItem("token");

  //   if (user != "") history("/login");
  // }, [history]);
  return (
    <div className="w-full flex justify-center items-center ">
      <FormEditAddress />
    </div>
  );
}

export default EditAddress;
