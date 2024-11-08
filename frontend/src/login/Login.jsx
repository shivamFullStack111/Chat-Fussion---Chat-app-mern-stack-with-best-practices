import { MdEmail, MdMessage, MdSecurityUpdate } from "react-icons/md";
import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { LogoInput } from "../components/loginAndRegister";
import { PiPassword } from "react-icons/pi";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen w-full dark:bg-darkbg bg-primary  flex  max-1000px:justify-center items-center ">
      <div className="w-[30%] max-1000px:hidden flex fle-col   min-h-[100vh] pt-[7vh] justify-center ">
        <div>
          <div className="text-2xl font-bold text-darkbg dark:text-white flex gap-2 h-min  items-center">
            <MdMessage col />
            <p> Chat Fusion</p>
          </div>

          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            make your free account
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
            <LogoInput title="Email" inputType="email" Logo={MdEmail} />

            <LogoInput
              title="Password"
              inputType="password"
              Logo={PiPassword}
            />

            <Button title={"Register"} className={"rounded-md"} />
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
  );
};

export default Login;
