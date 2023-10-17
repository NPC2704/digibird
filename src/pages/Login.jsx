import React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import axios from "axios";
import API from "../services/API";
// Import Recoil atom
import { tokenState } from "../recoil/initState";
const Login = () => {
  const history = useNavigate();
  // useEffect(() => {
  //   const user = localStorage.getItem("token");

  //   if (user != "") history("/");
  // }, [history]);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [company_id, setCompanyId] = useState("");
  const [, setToken] = useRecoilState(tokenState);

  const handleLogin = async () => {
    try {
      const response = await axios.post(API.LOGIN_ADDRESS, {
        id,
        name,
        company_id,
      });

      const token = response.data.data.token;

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Update Recoil atom with token
      setToken(token);
      const user = localStorage.getItem("token");

      if (user != "") {
        history("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <section className="h-screen">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form className="">
              <div className=" mb-5 sm:flex sm:justify-start sm:items-center flex justify-center items-center">
                <div className="w-[60%]">
                  <input
                    type="number"
                    placeholder="id"
                    size="lg"
                    className="mb-6 border-solid border-[1px] border-[#dad9dc] rounded-[5px] px-4 py-2"
                    onChange={(e) => setID(e.target.value)}
                  ></input>

                  <input
                    type="text"
                    placeholder="name"
                    className="mb-6 border-solid border-[1px] border-[#dad9dc] rounded-[5px] px-4 py-2 "
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    placeholder="company_id"
                    className="mb-6 border-solid border-[1px] border-[#dad9dc] rounded-[5px] px-4 py-2 "
                    onChange={(e) => setCompanyId(e.target.value)}
                  ></input>
                </div>
              </div>
              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <button
                  type="button"
                  className="inline-block rounded bg-[#3061af] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleLogin}
                >
                  Login
                </button>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?{" "}
                  <a
                    href="#!"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
