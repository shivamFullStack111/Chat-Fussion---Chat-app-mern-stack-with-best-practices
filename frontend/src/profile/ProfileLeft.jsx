/* eslint-disable react/prop-types */
import { MdGroups, MdMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";
import { PiClockUserThin, PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaLocationPin } from "react-icons/fa6";
import { useSelector } from "react-redux";

import { starGif, userImage } from "../utils.js";
const ProfileLeft = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
      <div className=" w-full h-[150px] bg-gray-600 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0001] flex justify-between p-3">
          <p className="text-white  font-semibold tracking-wide">My Profile</p>
          {/* <PiDotsThreeVerticalBold className="text-black bg-white p-2 text-3xl rounded-full" /> */}
        </div>
        {/* background image  */}
        <img
          className="object-cover bg-no-repeat w-full h-full"
          src={user?.backgroundImage||starGif}
          alt=""
        />

        <div className="flex justify-center">
          {/* profile image  */}
          <div className="h-20 w-20 bg-white rounded-full absolute -bottom-10  ">
            <img
              className="w-full h-full border-4 border-white rounded-full"
              src={user?.profileImage || userImage}
              alt=""
            />
          </div>
          <p className="text-gray-400 w-full text-center mt-16 pb-8 border-b-2 border-darkbg">
            {user?.name}
          </p>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <p className="text-lg text-gray-600">Basic info</p>

          <div className="flex text-sm text-gray-400 gap-2 items-center">
            <FaUser />
            <p>{user?.name}</p>
          </div>
          <div className="flex text-sm text-gray-400 gap-2 items-center">
            <MdMail />
            <p>{user?.email}</p>
          </div>
          <div className="flex text-sm text-gray-400 gap-2 items-center">
            <FaLocationPin />
            <p>India</p>
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
      </div>
    </div>
  );
};

export default ProfileLeft;
