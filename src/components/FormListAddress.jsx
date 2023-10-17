import React from "react";
import AddressItem from "./ListAddress/AddressItem";
import ButtonAddAddress from "./ListAddress/ButtonAddAddress";
const FormListAddress = () => {
  return (
    <div className="w-[90%]  mt-6 ">
      <ButtonAddAddress />
      <AddressItem />
    </div>
  );
};

export default FormListAddress;
