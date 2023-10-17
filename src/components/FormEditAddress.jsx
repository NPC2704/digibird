import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import FormListAddress from "../components/FormListAddress";
import { api, setAuthToken } from "../utils/setAuthToken";
import { tokenState } from "../recoil/initState";
import { useForm } from "react-hook-form";
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { PiMapPinLight } from "react-icons/pi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../services/API";
const FormEditAddress = () => {
  const { addressId } = useParams();
  const history = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const [provide, setProvide] = useState([]);
  const [district, setDistrict] = useState([]);
  const [provide1, setProvide1] = useState("1");
  const [selectedCity, setSelectedCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("Khong co");
  const [shipping_address, setShipping_address] = useState("");
  const [zipcode, setZipCode] = useState("1");
  const [city, setCity] = useState("Dong Nai");
  const [state, setState] = useState("ggg");
  const [country, setCountry] = useState("VN");
  const handleLUpdate = async () => {
    try {
      const response = await api.put(
        `https://test-pos.digibird.io/api/v1/front/self/address/${addressId}`,
        {
          name,
          email,
          phone,
          address,
          shipping_address,
          zipcode,
          city,
          state,
          country,
        }
      );
      history("/address");
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  //
  const token = useRecoilValue(tokenState);
  const [dataAddress, setDataAddress] = useState([]);
  useEffect(() => {
    // Cập nhật token trong header mỗi khi token thay đổi
    setAuthToken(token);

    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      try {
        const response = await api.get(
          `https://test-pos.digibird.io/api/v1/front/self/address/${addressId}?fields=id,xid,name,email,phone,address,shipping_address,city,state,country`
        );

        setDataAddress(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  //
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
    var callApiDistrict = async (api) => {
      // return axios.get(api).then((response) => {
      //   renderData(response.data.districts, "district");
      // });
      try {
        const getApi1 = await axios.get(api);
        setDistrict(getApi1?.data?.districts);
        //renderData(response.data, "province");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    callApiDistrict(`https://provinces.open-api.vn/api/p/${provide1}?depth=2`);
  }, [provide1]);

  useEffect(() => {
    if (dataAddress.name) {
      setName(dataAddress.name);
    }
  }, [dataAddress.name]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (dataAddress.phone) {
      setPhone(dataAddress.phone);
    }
  }, [dataAddress.phone]);

  const handlePhoneChange = (e) => {
    const newPhone = parseInt(e.target.value, 10); // Chuyển đổi giá trị thành số nguyên
    setPhone(newPhone);
  };

  useEffect(() => {
    if (dataAddress.email) {
      setEmail(dataAddress.email);
    }
  }, [dataAddress.email]);

  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (dataAddress.shipping_address) {
      setShipping_address(dataAddress.shipping_address);
    }
  }, [dataAddress.shipping_address]);

  const handleInputChangeShip = (e) => {
    setShipping_address(e.target.value);
  };

  useEffect(() => {
    if (dataAddress.city) {
      setCity(dataAddress.city);
    }
  }, [dataAddress.city]);
  useEffect(() => {
    if (dataAddress.state) {
      setState(dataAddress.state);
    }
  }, [dataAddress.state]);

  const handleInputChangeDis = (e) => {
    setState(e.target.options[e.target.selectedIndex].text);
  };
  return (
    <div className=" border-[2px] border-[#f0f0f0] border-solid w-[90%] h-[90%] mt-6 ">
      <div className="h-[20%] w-full  py-2 border-b-[2px] border-[#f0f0f0] border-solid">
        <p className="pl-6 font-bold">Chỉnh sửa địa chỉ</p>
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
            value={name}
            onChange={handleInputChange}
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
            value={phone}
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
            value={email}
            onChange={handleInputChangeEmail}
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
              {city}
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
              {state}
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
            onChange={handleInputChangeShip}
            value={shipping_address}
          ></input>
          <input
            type="submit"
            className="bg-[#f7d456] text-black px-3 py-2 rounded-[5px] mt-5"
            value="Lưu thông tin "
            onClick={handleLUpdate}
          />
        </form>
      </div>
    </div>
  );
};

export default FormEditAddress;
