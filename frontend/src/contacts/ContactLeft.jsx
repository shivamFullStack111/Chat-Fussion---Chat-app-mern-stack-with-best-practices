/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import { CgUnblock } from "react-icons/cg";
import brandLogo from "../images/brandLogo.png";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { MdBlock, MdBlockFlipped, MdDelete } from "react-icons/md";
import { dbUrl, returnToken } from "../utils";
import axios from "axios";
import {
  handleBlockUser,
  handleUnblockUser,
  removeFromContact,
} from "../../helpers/functions";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { setUser } from "../../store/slices/userSlice";
const ContactLeft = ({ dimensions }) => {
  const [groupedData, setgroupedData] = useState([]);
  const [searchText, setsearchText] = useState("");
  const { user } = useSelector((state) => state.user);

  const getContactsBySearch = async () => {
    setgroupedData([]);
    try {
      const token = returnToken();
      const res = await axios.post(
        `${dbUrl}/get-contacts-by-search`,
        { searchText },
        { headers: { Authorization: token } }
      );
      const resContacts = res.data.contacts || [];
      let alphabets = [];

      const sortedData = resContacts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      sortedData.forEach((contact) => {
        if (alphabets.includes(contact.name[0].toLowerCase())) {
          setgroupedData((p) => [...p, { type: "user", ...contact }]);
        } else {
          alphabets.push(contact.name[0].toLowerCase());
          setgroupedData((p) => [
            ...p,
            { type: "alphabet", letter: contact.name[0] },
          ]);
          setgroupedData((p) => [...p, { type: "user", ...contact }]);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      getContactsBySearch();
    }, 300);

    return () => {
      clearTimeout(time);
    };
  }, [searchText]);

  return (
    <>
      <Toaster />
      <div className="w-full max-1000px:z-30 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
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
              onChange={(e) => setsearchText(e.target.value)}
              value={searchText}
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
                if (data?.type == "user") {
                  if (data?.email == user?.email) return;
                  return (
                    <UserListItem
                      getContactsBySearch={getContactsBySearch}
                      groupedData={groupedData}
                      setgroupedData={setgroupedData}
                      key={i}
                      userr={data}
                    />
                  );
                } else
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
    </>
  );
};

export default ContactLeft;

const UserListItem = ({
  userr,
  i,
  groupedData,
  setgroupedData,
  getContactsBySearch,
}) => {
  const [optionActive, setoptionActive] = useState(false);
  const [isBlocked, setisBlocked] = useState(false);
  const { user, activeUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    if (activeUsers.length > 0 && userr) {
      const isExist = activeUsers.includes(userr.email);
      if (isExist) {
        {
          setisActive(true);
        }
      } else {
        setisActive(false);
      }
    }
  }, [activeUsers, userr]);

  useEffect(() => {
    if (user && userr) {
      if (user?.blockUsers.includes(userr._id)) {
        setisBlocked(true);
      } else {
        setisBlocked(false);
      }
    }
  }, [user, userr]);

  return (
    <motion.div
      // initial={{ y: 10, opacity: 0 }}
      // transition={{ duration: 0.4 }}
      // whileInView={{ y: 0, opacity: 1 }}
      className=" flex cursor-pointer items-center  gap-2"
      key={i}
    >
      <div className="flex gap-2 items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
            src=""
            alt=""
          >
            <div>{userr?.name[0]}</div>
          </div>
          <div>
            <p className="text-gray-500  text-[12px] flex gap-2 items-center">
              <p> {userr?.name} </p>
              {isActive && (
                <p className=" text-green-400 rounded-full text-[10px]">
                  online
                </p>
              )}
            </p>
            <p className="text-[12px] text-gray-600">
              +91 {userr?.phoneNumber}
            </p>
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
              {isBlocked ? (
                <div
                  onClick={async () => {
                    const res = await handleUnblockUser(userr?._id);
                    if (res.data.success) {
                      toast.success(res.data.message);
                      setisBlocked(false);
                      return dispatch(setUser(res.data.user));
                    } else {
                      return toast.error(res.data.message);
                    }
                  }}
                  className="flex items-center cursor-pointer text-sm text-gray-400 rounded-t-md justify-between p-2 hover:bg-gray-700"
                >
                  <p>Unblock</p>
                  <CgUnblock />
                </div>
              ) : (
                <div
                  onClick={async () => {
                    const res = await handleBlockUser(userr?._id);
                    if (res.data.success) {
                      toast.success(res.data.message);
                      setisBlocked(true);
                      return dispatch(setUser(res.data.user));
                    } else {
                      return toast.error(res.data.message);
                    }
                  }}
                  className="flex items-center cursor-pointer text-sm text-gray-400 rounded-t-md justify-between p-2 hover:bg-gray-700"
                >
                  <p>Block</p>
                  <MdBlock />
                </div>
              )}
              <div
                onClick={async () => {
                  const res = await removeFromContact(userr._id);
                  if (res.data.success) {
                    toast.success(res.data.message);
                    dispatch(setUser(res.data.user));
                    getContactsBySearch();
                    // const filterGroupData = groupedData.filter((usr) => {
                    //   if (usr._id !== userr._id) {
                    //     return usr;
                    //   }
                    // });

                    // setgroupedData(filterGroupData);
                  } else {
                    toast.error(res.data.message);
                  }
                }}
                className="flex items-center cursor-pointer text-sm text-gray-400 rounded-b-md justify-between p-2 hover:bg-gray-700"
              >
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
