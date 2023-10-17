import React from "react";
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { PiMapPinLight } from "react-icons/pi";
import { Link } from "react-router-dom";
const AddressItem = () => {
  return (
    <div className="w-[100%]    border-[2px] border-[#f0f0f0] border-solid flex justify-center items-center mt-4">
      <div className="w-[92%] h-[85%]  py-5">
        <div className="w-full h-[30px] flex justify-between">
          <p className="font-semibold text-[15px]">
            Họ và tên: Nguyen Phuoc Cong
          </p>
          <p className="text-[#ff0000f8] cursor-pointer">Xóa</p>
        </div>
        <div className="mt-2">
          <label for="city" className="flex  items-center mb-1">
            <PiMapPinLight />
            <p className="text-[14px] font-semibold ml-1">Địa chỉ</p>
          </label>

          <p className=" w-[100%]  py-1 outline-none mb-3 text-[13px]">
            Số 36, đường 24, ấp Quảng Hòa ,Trảng Bom, Đồng Nai
          </p>
        </div>
        <div className="mt-2">
          <label for="city" className="flex  items-center mb-1">
            <AiOutlinePhone />
            <p className="text-[14px] font-semibold ml-1 ">Số điện thoại</p>
          </label>

          <p className=" w-[100%]  py-1 outline-none mb-3 text-[13px]">
            0869154692
          </p>
        </div>
        <div className="mt-2">
          <label for="city" className="flex  items-center mb-1">
            <AiOutlineMail />
            <p className="text-[14px] font-semibold ml-1">Địa chỉ email</p>
          </label>

          <p className=" w-[100%]  py-1 outline-none mb-3 text-[13px]">
            ncp@gmail.com
          </p>
        </div>

        <Link to="/address/ss">
          <label className="text-[#4fe4ec] cursor-pointer">Chỉnh sửa</label>
        </Link>
      </div>
    </div>
  );
};

export default AddressItem;
