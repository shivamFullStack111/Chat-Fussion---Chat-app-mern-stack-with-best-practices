/* eslint-disable react/prop-types */
import { FaDashcube, FaUsers } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { PiUserListFill } from "react-icons/pi";
import {  MdSettings, MdWifiCalling3 } from "react-icons/md";

const HomeSideBar = ({ active }) => {
  let mobileContainerClassName =
    "max-1000px:fixed max-1000px:bottom-0 z-50 max-1000px:w-full max-1000px:flex-row max-1000px:h-auto max-1000px:border-0  ";
  return (
    <div
      className={`w-[70px]  h-full flex-col overflow-y-scroll bg-darkbg flex items-center  justify-evenly  ${mobileContainerClassName}`}
    >
      {navigation.map((item, i) => (
        <Navs key={i} index={i} item={item} active={active} />
      ))}
    </div>
  );
};

export default HomeSideBar;

export const Navs = ({ item, index, active }) => {
  const Icon = item.Icon;
  let mobileContainerClassName = "max-1000px:border-0 max-1000px:border-t-4 ";

  return (
    <div
      className={`w-full cursor-pointer flex justify-center border-l-4 py-3 border-darkbg text-gray-400 ${
        index + 1 == active && "border-primary text-primary"
      } ${mobileContainerClassName} `}
    >
      <Icon
        className={`hover:scale-110 transition-all duration-150  text-lg 350px:text-xl 400px:text-2xl 1000px:text-3xl`}
      />
    </div>
  );
};

const navigation = [
  {
    to: "/",
    Icon: FaDashcube,
    name: "Home",
  },
  {
    to: "/profile",
    Icon: FaRegUserCircle,
    name: "Profile",
  },
  {
    to: "/chats",
    Icon: TiMessages,
    name: "Chats",
  },

  {
    to: "/contacts",
    Icon: PiUserListFill,
    name: "Contacts",
  },
  {
    to: "/calls",
    Icon: MdWifiCalling3,
    name: "Calls",
  },
  {
    to: "/users",
    Icon: FaUsers,
    name: "Users",
  },
  {
    to: "/settings",
    Icon: MdSettings,
    name: "Settings",
  },
];
