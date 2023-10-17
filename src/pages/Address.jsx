// Import các hàm và hook cần thiết từ thư viện React
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { api, setAuthToken } from "../utils/setAuthToken";
import { tokenState } from "../recoil/initState";
import API from "../services/API";
import ButtonAddAddress from "../components/ListAddress/ButtonAddAddress";
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { PiMapPinLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
function Address() {
  // Đây là Page xem danh sách  Address
  const token = useRecoilValue(tokenState);
  const [dataListAddress, setDataListAddress] = useState([]);
  // Các state để lưu trữ thông tin số trang
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    // Cập nhật token trong header mỗi khi token thay đổi
    setAuthToken(token);

    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      const currentPageNow = currentPage - 1;
      try {
        const response = await api.get(
          `https://test-pos.digibird.io/api/v1/front/self/address?fields=id%2Cxid%2Cname%2Cemail%2Cphone%2Caddress%2Cshipping_address%2Ccity%2Cstate%2Ccountry&offset=${currentPageNow}0`
        );
        const roundedNumber =
          Math.ceil(response.data.meta.paging.total / 10) * 10;

        setTotalPage(roundedNumber);

        setDataListAddress(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, currentPage]);
  return (
    <div className="w-full flex justify-center items-center ">
      <div className="w-[90%]  mt-6 ">
        <ButtonAddAddress />
        {/* map danh sách address được lấy từ API ở trên */}
        {dataListAddress.map((item, index) => (
          <div className="w-[100%]   border-[2px] border-[#f0f0f0] border-solid flex justify-center items-center mt-4">
            <div className="w-[92%] h-[85%]  py-5">
              <div className="w-full h-[30px] flex justify-between">
                <p className="font-semibold text-[15px]">
                  Họ và tên: {dataListAddress[index]?.name}
                </p>
                <p className="text-[#ff0000f8] cursor-pointer">Xóa</p>
              </div>
              <div className="mt-2">
                <label for="city" className="flex  items-center mb-1">
                  <PiMapPinLight />
                  <p className="text-[14px] font-semibold ml-1">Địa chỉ</p>
                </label>

                <p className=" w-[100%]  py-1 outline-none mb-3 text-[13px]">
                  {dataListAddress[index]?.shipping_address}{" "}
                  {dataListAddress[index]?.state} {dataListAddress[index]?.city}{" "}
                  {dataListAddress[index]?.country}
                </p>
              </div>
              <div className="mt-2">
                <label for="city" className="flex  items-center mb-1">
                  <AiOutlinePhone />
                  <p className="text-[14px] font-semibold ml-1 ">
                    Số điện thoại
                  </p>
                </label>

                <p className=" w-[100%]  py-1 outline-none mb-3 text-[13px]">
                  {dataListAddress[index]?.phone}
                </p>
              </div>
              <div className="mt-2">
                <label for="city" className="flex  items-center mb-1">
                  <AiOutlineMail />
                  <p className="text-[14px] font-semibold ml-1">
                    Địa chỉ email
                  </p>
                </label>

                <p className=" w-[100%]  py-1 outline-none mb-3 text-[13px]">
                  {dataListAddress[index]?.email}
                </p>
              </div>

              <Link to={`/address/${dataListAddress[index]?.xid}`}>
                <label className="text-[#4fe4ec] cursor-pointer">
                  Chỉnh sửa
                </label>
              </Link>
            </div>{" "}
          </div>
        ))}
        <div className="w-full h-[40px] mx-4 flex justify-center items-center">
          <Pagination
            simple
            defaultCurrent={1}
            onChange={(currentPage) => setCurrentPage(currentPage)}
            total={totalPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Address;
