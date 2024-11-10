/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import brandLogo from "../images/brandLogo.png";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { MdBlock, MdDelete } from "react-icons/md";

const ContactLeft = ({ dimensions }) => {
  const [groupedData, setgroupedData] = useState([]);

  useEffect(() => {
    let alphabets = [];

    let sortedData = users.sort((a, b) => a.name.localeCompare(b.name));

    sortedData.forEach((user) => {
      if (alphabets.includes(user.name[0].toLowerCase())) {
        setgroupedData((p) => [...p, { type: "user", ...user }]);
      } else {
        alphabets.push(user.name[0].toLowerCase());
        setgroupedData((p) => [
          ...p,
          { type: "alphabet", letter: user.name[0] },
        ]);
        setgroupedData((p) => [...p, { type: "user", ...user }]);
      }
    });
  }, []);

  return (
    <div className="w-full 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
      <div className="p-7 pb-0">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-gray-500">Contacts</p>
          <img
            className="w-10 h-10 rounded-full bg-darkbg"
            src={brandLogo}
            alt=""
          />
        </div>
        <div className="flex items-center bg-darkbg p-3 py-1 mt-5 rounded-md">
          <input
            placeholder="Search..."
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
          className=" overflow-y-scroll overflow-x-hidden scroll-smooth"
        >
          <div className="flex flex-col gap-2 mt-4">
            {groupedData.map((data, i) => {
              if (data?.type == "user")
                return <UserListItem key={i} user={data} />;
              else
                return (
                  <div className="flex gap-2 items-center" key={i}>
                    <p className="text-green-400 text-sm">{data?.letter}</p>
                    <p className="w-full h-min border-b border-gray-600"></p>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLeft;

const UserListItem = ({ user, i }) => {
  const [optionActive, setoptionActive] = useState(false);
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.4 }}
      whileInView={{ y: 0, opacity: 1 }}
      className=" flex items-center  gap-2"
      key={i}
    >
      <div className="flex gap-2 items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
            src=""
            alt=""
          >
            {user?.name[0]}
          </div>
          <div>
            <p className="text-gray-500  text-[12px]">{user?.name}</p>
            <p className="text-[12px] text-gray-600">{user?.number}</p>
          </div>
        </div>
        <div className="relative">
          {!optionActive ? (
            <PiDotsThreeVerticalBold
              onClick={() => setoptionActive((p) => !p)}
              className={`mr-2 text-gray-400 cursor-pointer `}
            />
          ) : (
            <RxCross1
              onClick={() => setoptionActive((p) => !p)}
              className={`mr-2 text-gray-400 cursor-pointer `}
            />
          )}
          {optionActive && (
            <div className="h-auto w-28  bg-darkbg  z-50  rounded-md absolute right-10 top-0  ">
              <div className="flex items-center cursor-pointer text-sm text-gray-400 rounded-t-md justify-between p-2 hover:bg-gray-700">
                <p>Block</p>
                <MdBlock />
              </div>
              <div className="flex items-center cursor-pointer text-sm text-gray-400 rounded-b-md justify-between p-2 hover:bg-gray-700">
                <p>Remove</p>
                <MdDelete />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const users = [
  { name: "Aarav", number: "+91 9123456781" },
  { name: "Vihaan", number: "+91 9123456782" },
  { name: "Aditya", number: "+91 9123456783" },
  { name: "Ishaan", number: "+91 9123456784" },
  { name: "Shaurya", number: "+91 9123456785" },
  { name: "Vivaan", number: "+91 9123456786" },
  { name: "Arjun", number: "+91 9123456787" },
  { name: "Sai", number: "+91 9123456788" },
  { name: "Reyansh", number: "+91 9123456789" },
  { name: "Krishna", number: "+91 9123456790" },
  { name: "Kartik", number: "+91 9123456791" },
  { name: "Rishi", number: "+91 9123456792" },
  { name: "Rohan", number: "+91 9123456793" },
  { name: "Om", number: "+91 9123456794" },
  { name: "Aryan", number: "+91 9123456795" },
  { name: "Laksh", number: "+91 9123456796" },
  { name: "Kabir", number: "+91 9123456797" },
  { name: "Ayaan", number: "+91 9123456798" },
  { name: "Dhruv", number: "+91 9123456799" },
  { name: "Jay", number: "+91 9123456800" },
];
