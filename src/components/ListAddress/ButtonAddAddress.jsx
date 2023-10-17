import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
const ButtonAddAddress = () => {
  return (
    <div className="w-[100%] h-[180px]   border-[2px] border-[#f0f0f0] border-solid flex justify-center items-center">
      <div className="w-[92%] h-[85%]  border-dashed border-[#f0f0f0] border-[2px] flex justify-center items-center">
        <div className="w-[50%] h-full flex justify-center items-center">
          <div className="w-[60%] h-[80%]  ">
            <Link to="/add-address">
              <div className="rounded-[50%] border-dashed border-[#f0f0f0] border-[2px] w-[60px] h-[60px] mb-4 mx-auto flex justify-center items-center">
                <div className="text-[40px] text-[#ededed]">
                  <FiPlus />
                </div>
              </div>
              <div className="w-[90px] h-[50px] mx-auto px-1">
                <button className="w-full bg-[#f0f0f0]  rounded-[2px] text-black text-[14px]">
                  Thêm mới
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonAddAddress;
