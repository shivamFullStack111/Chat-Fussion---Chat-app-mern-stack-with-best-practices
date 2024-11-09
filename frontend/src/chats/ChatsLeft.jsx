/* eslint-disable react/prop-types */
import { MdGroups, MdMail } from "react-icons/md";
import { FaSearch, FaUser } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";
import { PiClockUserThin, PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaLocationPin } from "react-icons/fa6";
import brandLogo from "../images/brandLogo.png";

const ChatLeft = ({ dimensions }) => {
  console.log(dimensions)
  return (
    <div className="w-full 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
      <div className="p-7 pb-0">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-gray-500">Chats</p>
          <img
            className="w-10 h-10 rounded-full bg-darkbg"
            src={brandLogo}
            alt=""
          />
        </div>
        <div className="flex items-center bg-darkbg p-3 py-1 mt-5 rounded-md">
          <input
            spellCheck={false}
            className="outline-none text-sm text-gray-300 w-full p-[5px] bg-darkbg "
            type="text "
          />
          <FaSearch className=" text-gray-400" />
        </div>

        <div
          style={{
            height:
              dimensions?.width > 1000
                ? dimensions?.height - 130
                : dimensions?.height - 180,
          }}
          className=" overflow-y-scroll"
        >
          <p className="mt-6 text-[13px] text-gray-400">FAVOURITES</p>
          <div className="flex flex-col gap-2 mt-4">
            {[
              "ram",
              "Karan",
              "priya",
              "Sham",
              "ram",
              "Karan",
              "priya",
              "ram",
              "Karan",
            ].map((user, i) => (
              <div className=" flex items-center  gap-2" key={i}>
                <div
                  className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
                  src=""
                  alt=""
                >
                  {user[0]}
                  <p className="absolute h-3 w-3 bg-green-400 rounded-full -bottom-1 right-1"></p>
                </div>
                <p className="text-gray-500 text-[12px]">{user}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[13px] text-gray-400">FAVOURITES</p>
          <div className="flex flex-col gap-2 mt-4">
            {["ram", "Karan", "priya", "Sham"].map((user, i) => (
              <div className=" flex items-center  gap-2" key={i}>
                <div
                  className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
                  src=""
                  alt=""
                >
                  {user[0]}
                  <p className="absolute h-3 w-3 bg-green-400 rounded-full -bottom-1 right-1"></p>
                </div>
                <p className="text-gray-500 text-[12px]">{user}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLeft;
