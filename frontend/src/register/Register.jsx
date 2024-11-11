import { MdEmail, MdMessage } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { LogoInput } from "../components/loginAndRegister";
import { PiPassword } from "react-icons/pi";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import OtpModal from "./OtpModal";
import axios from "axios";

const Register = () => {
  const [data, setdata] = useState(null);
  const [otpTakingOpen, setotpTakingOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log("first");
      if (
        !data?.name ||
        !data?.email ||
        !data?.phoneNumber ||
        !data?.password ||
        !data?.confirmPassword
      ) {
        return toast.error("All field are required");
      }

      if (data?.phoneNumber?.length < 10)
        return toast.error("Enter a correct phone number");
      if (!data?.email?.includes("@gmail.com"))
        return toast.error("Please enter a valid email address");
      if (data?.password?.length < 8 || data?.confirmPassword?.length < 8)
        return toast.error("Password must be at least 8 characters");

      if (data?.password !== data?.confirmPassword)
        return toast.error("Password and confirm password must be the same");

      // api call here
      const res = await axios.post("http://localhost:8000/register", data);
      console.log(res.data);
      if (res.data?.success) {
        toast.success(res.data?.message);
        setotpTakingOpen(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {otpTakingOpen && <OtpModal setotpTakingOpen={setotpTakingOpen} />}
      <Toaster position="top-right" />
      <div className="h-screen w-full dark:bg-darkbg bg-primary  flex  max-1000px:justify-center items-center ">
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

        <div className="h-[97vh] cursor-pointer overflow-y-scroll w-[98%] 1000px:w-[69%] rounded-3xl bg-white items-center flex flex-col justify-center">
          <p className="text-2xl font text-gray-700 text-center mt-4 ">
            Register Account
          </p>
          <p className="text-sm font text-gray-400 text-center font- tracking-wide ">
            make your free account
          </p>

          <div className="mt-8 flex flex-col w-full gap-2 items-center justify-center">
            <div className="w-[90%] 500px:w-[80%] 700px:w-[60%] flex flex-col gap-3 1200px:w-[400px]">
              <LogoInput
                onChange={(e) => {
                  setdata((p) => ({ ...p, name: e.target.value }));
                }}
                value={data?.name}
                title="Name"
              />
              <LogoInput
                onChange={(e) => {
                  setdata((p) => ({ ...p, email: e.target.value }));
                }}
                value={data?.email}
                title="Email"
                inputType="email"
                Logo={MdEmail}
              />
              <LogoInput
                onChange={(e) => {
                  if (
                    data?.phoneNumber?.length > 9 &&
                    data?.phoneNumber < e.target.value
                  )
                    return;
                  setdata((p) => ({ ...p, phoneNumber: e.target.value }));
                }}
                value={data?.phoneNumber}
                title="Phone number"
                inputType="number"
                Logo={FaPhoneAlt}
              />
              <LogoInput
                onChange={(e) => {
                  setdata((p) => ({ ...p, password: e.target.value }));
                }}
                value={data?.password}
                title="Password"
                inputType="password"
                Logo={PiPassword}
              />
              <LogoInput
                onChange={(e) => {
                  setdata((p) => ({ ...p, confirmPassword: e.target.value }));
                }}
                value={data?.confirmPassword}
                title="Confirm password"
                inputType="password"
                Logo={PiPassword}
              />
              <div className="text-[12px] text-gray-600">
                By registering you agree to the Doot{" "}
                <p className="text-green-500 inline">Terms of Use</p>{" "}
              </div>
              <Button
                onClick={handleSubmit}
                title={"Register"}
                className={"rounded-md"}
              />
              <div className="text-sm text-gray-600 text-center">
                Not have an account ?{" "}
                <Link
                  to={"/signin"}
                  className="text-green-500 hover:text-green-400 underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
