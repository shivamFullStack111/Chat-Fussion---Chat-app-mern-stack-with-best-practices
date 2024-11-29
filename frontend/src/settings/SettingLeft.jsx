/* eslint-disable react/prop-types */
import { MdBlockFlipped, MdGroups, MdMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";
import { PiClockUserThin } from "react-icons/pi";
import { FaLocationPin, FaPhone } from "react-icons/fa6";
import { RiContactsBook3Fill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

import { setisAuthenticated, setUser } from "../../store/slices/userSlice.js";
import { useEffect, useState } from "react";
import { starGif } from "../utils.js";

const SettingLeft = ({ dimensions }) => {
  const dispatch = useDispatch();
  const { user, activeUsers, allConversation } = useSelector(
    (state) => state.user
  );
  const [totalGroups, settotalGroups] = useState(0);

  useEffect(() => {
    if (!user || !allConversation?.length) return;

    const groupConversation = allConversation?.filter(
      (conversation) => conversation?.type == "group"
    );

    settotalGroups(groupConversation.length);
  }, [allConversation, user]);

  return (
    <div className="w-full 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
      <div className=" w-full h-[150px] bg-gray-600 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0001] flex justify-between p-3">
          <p className="text-white  font-semibold tracking-wide">Settings</p>
        </div>
        {/* background image  */}

        <img
          className="object-cover bg-no-repeat w-full h-full"
          src={user?.backgroundImage || starGif}
          alt=""
        />

        <div className="flex justify-center">
          {/* profile image  */}
          <div className="h-20 w-20 bg-white rounded-full absolute -bottom-10  ">
            <img
              className="w-full h-full border-4 border-white rounded-full"
              // src="https://dootnode.themesbrand.website/assets/images/users/62188.png"
              src={
                user?.profileImage ||
                "data:image/png;base64,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"
              }
              alt=""
            />
          </div>
          <p className="text-gray-400 w-full text-center relative  mt-12 pb-8  ">
            {user?.name}
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
            <p>{user?.blockUsers?.length}</p>
          </div>
          <div className="p-2 border-y-2 border-t-0 border-darkbg  flex justify-between text-sm text-gray-500">
            <div className="flex gap-2 items-center">
              <RiContactsBook3Fill />
              <p>Contacts </p>
            </div>
            <p>{user?.contacts?.length}</p>
          </div>
          <div className="p-2 border-y-2 border-t-0 border-darkbg  flex justify-between text-sm text-gray-500">
            <div className="flex gap-2 items-center">
              <MdGroups />
              <p>Groups </p>
            </div>
            <p>{totalGroups}</p>
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
              <FaPhone />
              <p>+91 {user?.phoneNumber}</p>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <p className="text-lg text-gray-600">Personal info</p>

            <div className="flex text-sm w-full  text-gray-400 gap-2 items-center">
              <RiContactsBook2Fill />
              <div className=" flex bg-red w-[100%] justify-between">
                <p>Contacts</p>
                <p>{user?.contacts?.length}</p>
              </div>
            </div>
            <div className="flex text-sm w-full  text-gray-400 gap-2 items-center">
              <PiClockUserThin />
              <div className=" flex bg-red w-[100%] justify-between">
                <p>Active users</p>
                <p>{activeUsers?.length}</p>
              </div>
            </div>
            <div className="flex text-sm w-full  text-gray-400 gap-2 items-center">
              <MdGroups />
              <div className=" flex bg-red w-[100%] justify-between">
                <p>Groups</p>
                <p>{totalGroups}</p>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              Cookies.remove("token");
              dispatch(setUser(null));
              dispatch(setisAuthenticated(false));
              window.location.reload();
            }}
            className="bg-red-500  py-1 rounded-sm ml-auto max-w-[130px] text-white hover:bg-red-400 cursor-pointer flex justify-center items-center gap-2"
          >
            <p>Log Out</p>
            <IoIosLogOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingLeft;
