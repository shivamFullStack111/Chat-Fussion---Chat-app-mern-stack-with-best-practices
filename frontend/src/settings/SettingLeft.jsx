/* eslint-disable react/prop-types */
import { MdBlockFlipped, MdGroups, MdMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";
import { PiClockUserThin, } from "react-icons/pi";
import {  FaLocationPin } from "react-icons/fa6";
import { RiContactsBook3Fill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";

const SettingLeft = ({ dimensions }) => {
  return (
    <div className="w-full 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
      <div className=" w-full h-[150px] bg-gray-600 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0001] flex justify-between p-3">
          <p className="text-white  font-semibold tracking-wide">Settings</p>
        </div>
        {/* background image  */}

        <img
          className="object-cover bg-no-repeat w-full h-full"
          src="https://dootnode.themesbrand.website/assets/images/small/Tosotoso%20Ga%20Ni%20Vosota.jpg"
          alt=""
        />

        <div className="flex justify-center">
          {/* profile image  */}
          <div className="h-20 w-20 bg-white rounded-full absolute -bottom-10  ">
            <img
              className="w-full h-full border-4 border-white rounded-full"
              src="https://dootnode.themesbrand.website/assets/images/users/62188.png"
              alt=""
            />
          </div>
          <p className="text-gray-400 w-full text-center relative  mt-16 pb-8  ">
            Shivam
          </p>
        </div>
      </div>
      <div
        style={{
          height:
            dimensions?.width > 1000
              ? dimensions?.height - 240
              : dimensions?.height - 290,
        }}
      >
        <div className="overflow-y-scroll h-full mt-[100px] p-4 ">
          <div className="p-2 border-y-2 border-darkbg  flex justify-between text-sm text-gray-500">
            <div className="flex gap-2 items-center">
              <MdBlockFlipped />
              <p>Block users </p>
            </div>
            <p>6</p>
          </div>
          <div className="p-2 border-y-2 border-t-0 border-darkbg  flex justify-between text-sm text-gray-500">
            <div className="flex gap-2 items-center">
              <RiContactsBook3Fill />
              <p>Contacts </p>
            </div>
            <p>89</p>
          </div>
          <div className="p-2 border-y-2 border-t-0 border-darkbg  flex justify-between text-sm text-gray-500">
            <div className="flex gap-2 items-center">
              <MdGroups />
              <p>Groups </p>
            </div>
            <p>4</p>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <p className="text-lg text-gray-600">Basic info</p>

            <div className="flex text-sm text-gray-400 gap-2 items-center">
              <FaUser />
              <p>Shivam</p>
            </div>
            <div className="flex text-sm text-gray-400 gap-2 items-center">
              <MdMail />
              <p>Shivam@gmail.com</p>
            </div>
            <div className="flex text-sm text-gray-400 gap-2 items-center">
              <FaLocationPin />
              <p>Shivam@gmail.com</p>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <p className="text-lg text-gray-600">Personal info</p>

            <div className="flex text-sm w-full  text-gray-400 gap-2 items-center">
              <RiContactsBook2Fill />
              <div className=" flex bg-red w-[100%] justify-between">
                <p>Contacts</p>
                <p>35</p>
              </div>
            </div>
            <div className="flex text-sm w-full  text-gray-400 gap-2 items-center">
              <PiClockUserThin />
              <div className=" flex bg-red w-[100%] justify-between">
                <p>Active users</p>
                <p>4</p>
              </div>
            </div>
            <div className="flex text-sm w-full  text-gray-400 gap-2 items-center">
              <MdGroups />
              <div className=" flex bg-red w-[100%] justify-between">
                <p>Groups</p>
                <p>8</p>
              </div>
            </div>
          </div>
          <div className="bg-red-500  py-1 rounded-sm ml-auto max-w-[130px] text-white hover:bg-red-400 cursor-pointer flex justify-center items-center gap-2">
            <p>Log Out</p>
            <IoIosLogOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingLeft;
