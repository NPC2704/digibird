// Import các hàm và hook cần thiết từ thư viện React
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { PiMapPinLight } from "react-icons/pi";
import axios from "axios";
import { tokenState } from "../recoil/initState";
import { api, setAuthToken } from "../utils/setAuthToken";
import API from "../services/API";
import { useRecoilValue } from "recoil";
const FormAddAddress = () => {
  // Sử dụng useForm hook từ thư viện react-hook-form để quản lý form
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const [provide, setProvide] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [provide1, setProvide1] = useState("1");
  // Các state để lưu trữ thông tin địa chỉ và dữ liệu từ API
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("Khong co");
  const [shipping_address, setShipping_address] = useState("");
  const [zipcode, setZipCode] = useState("1");
  const [city, setCity] = useState("Dong Nai");
  const [state, setState] = useState("ggg");
  const [country, setCountry] = useState("VN");
  // Vì phone ở API là number nên phải có bước chuyển đổi giá trị thành số nguyên
  const handlePhoneChange = (e) => {
    const newPhone = parseInt(e.target.value, 10);
    setPhone(newPhone);
  };
  // Khi gọi hàm này ở hành động onClick ở phía dưới ở button Thêm địa chỉ , hàm này call API thêm Address
  const handleLAdd = async () => {
    try {
      const response = await api.post(API.POST_ADDRESS, {
        name,
        email,
        phone,
        address,
        shipping_address,
        zipcode,
        city,
        state,
        country,
      });

      // Update Recoil atom with token
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    // Cập nhật token trong header mỗi khi token thay đổi
    setAuthToken(token);

    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      try {
        const response = await api.get(API.GET_ADDRESS);

        setDataListAddress(response.data.data); // Cập nhật dữ liệu từ API vào state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]); // useEffect sẽ chạy lại khi token thay đổi

  // 2 useEffect dưới dùng để load 2 API thông tin các tỉnh và huyện ở nước ta
  useEffect(() => {
    const callAPI = async (api) => {
      try {
        const getApi = await axios.get(api);
        setProvide(getApi.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    callAPI("https://provinces.open-api.vn/api/?depth=1");
  }, []);
  useEffect(() => {
    var callApiDistrict = async (api) => {
      try {
        const getApi1 = await axios.get(api);
        setDistrict(getApi1?.data?.districts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    callApiDistrict(`https://provinces.open-api.vn/api/p/${provide1}?depth=2`);
  }, [provide1]);

  return (
    <div className=" border-[2px] border-[#f0f0f0] border-solid w-[90%] h-[90%] mt-6 ">
      <div className="h-[20%] w-full  py-2 border-b-[2px] border-[#f0f0f0] border-solid">
        <p className="pl-6 font-bold">Thêm địa chỉ mới</p>
      </div>
      <div className="h-[80%] w-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full px-5 py-7"
        >
          <label for="fname" className="flex  items-center mb-1">
            <AiOutlineUser />
            <p className="text-[14px] font-semibold ml-1"> Họ và tên</p>
          </label>

          <input
            {...register("fname", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3"
            placeholder="Nguyễn Phước Công"
            onChange={(e) => setName(e.target.value)}
          />
          <label for="phone" className="flex  items-center mb-1">
            <AiOutlinePhone />
            <p className="text-[14px] font-semibold ml-1">Số điện thoại</p>
          </label>
          <input
            {...register("phone", { min: 18, max: 99 })}
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3"
            placeholder="0 xxx xxx"
            type="number"
            onChange={handlePhoneChange}
          />
          <label for="email" className="flex  items-center mb-1">
            <AiOutlineMail />
            <p className="text-[14px] font-semibold ml-1">Địa chỉ email</p>
          </label>
          <input
            {...register("email", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3"
            placeholder="example@example"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="city" className="flex  items-center mb-1">
            <PiMapPinLight />
            <p className="text-[14px] font-semibold ml-1">Tỉnh, thành phố</p>
          </label>

          <select
            {...register("city", { required: true, maxLength: 20 })}
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3"
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setCity(e.target.options[e.target.selectedIndex].text);
              setProvide1(e.target.value);
            }}
            value={selectedCity}
          >
            <option value="" disabled hidden>
              Tỉnh, thành phố
            </option>
            {provide.map((item, index) => (
              <option value={item?.code} key={index}>
                {item?.name}
              </option>
            ))}
          </select>
          <label for="dt" className="flex  items-center mb-1">
            <PiMapPinLight />
            <p className="text-[14px] font-semibold ml-1">Quận, huyện</p>
          </label>
          <select
            {...register("city", { required: true, maxLength: 20 })}
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3"
            placeholder="Quận huyện"
            onChange={(e) =>
              setState(e.target.options[e.target.selectedIndex].text)
            }
          >
            <option value="" disabled hidden>
              Quận huyện
            </option>
            {district.map((item, index) => (
              <option value={item?.code} selected key={index}>
                {item?.name}
              </option>
            ))}
          </select>
          <label for="cuthe" className="flex  items-center mb-1">
            <PiMapPinLight />
            <p className="text-[14px] font-semibold ml-1">Địa chỉ cụ thể</p>
          </label>
          <input
            {...register("cuthe", { required: true, maxLength: 20 })}
            className="border-[2px] border-[#f0f0f0] border-solid w-[100%] px-2 py-1 outline-none mb-3"
            placeholder="Địa chỉ cụ thể"
            onChange={(e) => setShipping_address(e.target.value)}
          ></input>
          <button
            className="bg-[#f7d456] text-black px-3 py-2 rounded-[5px] mt-5"
            onClick={handleLAdd}
          >
            Lưu thông tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAddAddress;
