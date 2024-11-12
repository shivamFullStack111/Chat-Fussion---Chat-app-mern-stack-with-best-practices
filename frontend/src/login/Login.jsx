import { MdEmail, MdMessage } from "react-icons/md";
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { LogoInput } from "../components/loginAndRegister";
import { PiPassword } from "react-icons/pi";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Transparent_Loader from "../components/Transparent_Loader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setisAuthenticated, setUser } from "../../store/slices/userSlice.js";

import Cookies from "js-cookie";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { dbUrl } from "../utils.js";
const Login = () => {
  const [isRequesting, setisRequesting] = useState(false);
  const [data, setdata] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${dbUrl}/login`, data);
      if (res.data.success) {
        Cookies.set("token", res.data.token);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        dispatch(setisAuthenticated(true));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {isRequesting && <Transparent_Loader />}
      <Toaster />
      <div
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dosyxpa1r/image/upload/v1731433036/dosyxpa1r/t6pmii4rrkz3b659vloa.gif")`,
        }}
        className="h-screen bg-no-repeat bg-cover w-full dark:bg-darkbg bg-primary  flex  max-1000px:justify-center items-center "
      >
        <div className="w-[30%] max-1000px:hidden flex fle-col   min-h-[100vh] pt-[7vh] justify-center ">
          <div>
            <div className="text-2xl font-bold text-darkbg dark:text-white flex gap-2 h-min  items-center">
              <MdMessage col />
              <p> Chat Fusion</p>
            </div>

            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Share you fellings and thoughts
            </p>
          </div>
        </div>

        <div className="h-[97vh]  cursor-pointer overflow-y-scroll w-[98%] 1000px:w-[69%] rounded-3xl flex flex-col bg-white justify-center items-center">
          <p className="text-2xl font text-gray-700 text-center mt-4 ">
            Welcome Back!
          </p>
          <p className="text-sm font text-gray-400 text-center font- tracking-wide ">
            Sign in to continue to Chat Fusion.
          </p>

          <div className="mt-8 flex flex-col w-full gap-2 items-center">
            <div className="w-[90%] 500px:w-[80%] 700px:w-[60%] flex flex-col gap-3 1200px:w-[400px]">
              <LogoInput
                onChange={(e) =>
                  setdata((p) => ({ ...p, email: e.target.value }))
                }
                title="Email"
                inputType="email"
                Logo={MdEmail}
              />

              <LogoInput
                onChange={(e) =>
                  setdata((p) => ({ ...p, password: e.target.value }))
                }
                title="Password"
                inputType="password"
                Logo={PiPassword}
              />

              <Button
                onClick={async () => {
                  setisRequesting(true);
                  await handleSubmit();
                  setisRequesting(false);
                }}
                title={"Login"}
                className={"rounded-md"}
              />
              <div className="text-sm text-gray-600 text-center">
                Already have an account ?{" "}
                <Link
                  to={"/signup"}
                  className="text-green-500 hover:text-green-400 underline"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
