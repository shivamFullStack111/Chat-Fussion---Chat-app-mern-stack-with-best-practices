import { MdEmail, MdMessage, MdSecurityUpdate } from "react-icons/md";
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { LogoInput } from "../components/loginAndRegister";
import { PiPassword } from "react-icons/pi";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Transparent_Loader from "../components/Transparent_Loader";
import { useState } from "react";

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  return (
    <>
      {isLoading && <Transparent_Loader />}
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
              <LogoInput title="Name" />
              <LogoInput title="Email" inputType="email" Logo={MdEmail} />
              <LogoInput
                title="Phone number"
                inputType="number"
                Logo={FaPhoneAlt}
              />
              <LogoInput
                title="Password"
                inputType="password"
                Logo={PiPassword}
              />
              <LogoInput
                title="Confirm password"
                inputType="password"
                Logo={PiPassword}
              />
              <div className="text-[12px] text-gray-600">
                By registering you agree to the Doot{" "}
                <p className="text-green-500 inline">Terms of Use</p>{" "}
              </div>
              <Button title={"Register"} className={"rounded-md"} />
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
