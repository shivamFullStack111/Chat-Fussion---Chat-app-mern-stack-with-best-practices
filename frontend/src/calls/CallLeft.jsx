/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import brandLogo from "../images/brandLogo.png";
import { GoArrowDown } from "react-icons/go";
import { IoCall } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { useEffect, useState } from "react";
import { dbUrl, returnToken } from "../utils";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import {
  setCallerUser,
  setCallOponent,
  setCallType,
  setIsCallSending,
} from "../../store/slices/callSlice";
import { setConversation } from "../../store/slices/chatSlice";
const CallLeft = ({ dimensions }) => {
  const [callMessages, setcallMessages] = useState([]);

  useEffect(() => {
    const getCallMessages = async () => {
      try {
        const token = returnToken();
        const res = await axios.get(`${dbUrl}/get-call-messages`, {
          headers: { Authorization: token },
        });

        setcallMessages(res.data?.messages);
      } catch (error) {
        console.log(error.message);
      }
    };

    getCallMessages();
  }, []);

  return (
    <div className="w-full 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
      <div className="p-7 pb-0">
        <div className="flex justify-between pb-6 items-center">
          <p className="text-2xl font-semibold text-gray-500">Calls</p>
          <img
            className="w-10 h-10 rounded-full bg-darkbg"
            src={brandLogo}
            alt=""
          />
        </div>
        {/* <div className="flex items-center bg-darkbg p-3 py-1 mt-5 rounded-md">
          <input
            placeholder="Search..."
            spellCheck={false}
            className="outline-none text-sm text-gray-300 w-full p-[5px] bg-darkbg "
            type="text "
          />
          <FaSearch className=" text-gray-400" />
        </div> */}

        <div
          style={{
            height:
              dimensions?.width > 1000
                ? dimensions?.height - 130
                : dimensions?.height - 180,
          }}
          className=" overflow-y-scroll overflow-x-hidden scroll-smooth"
        >
          <div className="flex flex-col gap-3 mt-4">
            {callMessages?.map((call, i) => (
              <CallCard key={i} message={call} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLeft;

function CallCard({ message }) {
  const [otherUser, setotherUser] = useState(null);
  const { allUsers, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isImageShow, setisImageShow] = useState(false);

  useEffect(() => {
    if (!user || !otherUser) return;
    if (otherUser?.profilePicture == "everyone") {
      setisImageShow(true);
    } else if (otherUser?.profilePicture == "nobody") {
      setisImageShow(false);
    } else if (otherUser?.profilePicture == "friends") {
      const isExist = user?.contacts?.find(
        (userid) => userid == otherUser?._id
      );
      if (isExist) {
        setisImageShow(true);
      }
    }

    // console.log(isImageShow);
  }, [user, otherUser]);



  useEffect(() => {
    if (!user || !message || !allUsers?.length) return;

    let opEmail;

    if (message?.sender == user?.email) opEmail = message?.receiver;
    else opEmail = message?.sender;

    const opUser = allUsers.find((usr) => usr.email == opEmail);

    setotherUser(opUser);
  }, [message, user?.email, allUsers]);

  return (
    <div className=" flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <div
          className="h-9 w-9  rounded-full relative bg-primary flex justify-center items-center"
          src=""
          alt=""
        >
          {!isImageShow && otherUser?.name[0]}
          {otherUser?.profileImage && isImageShow && (
            <img
              src={otherUser?.profileImage}
              className="w-full h-full rounded-full "
            ></img>
          )}
        </div>
        <div>
          <p className="text-[13px] text-gray-500 leading-tight">
            {otherUser?.name}
          </p>
          <div className="text-[12px] flex items-center gap-1 text-gray-600 leading-tight">
            {message?.sender == user?.email ? (
              <motion.div animate={{ rotate: -140 }}>
                <GoArrowDown className="text-green-500 " />{" "}
              </motion.div>
            ) : (
              <GoArrowDown className="text-green-500 rotate-45" />
            )}

            <p>
              {new Date(message?.createdAt).getDate()}-
              {new Date(message?.createdAt).getMonth()}-
              {new Date(message?.createdAt).getFullYear()}{" "}
              {new Date(message?.createdAt).getHours()}:
              {new Date(message?.createdAt).getMinutes()}{" "}
              {new Date(message?.createdAt).getHours() > 12 ? "Pm" : "Am"}
            </p>
          </div>
        </div>
      </div>

      <p className="text-green-500 text-xl">
        {message?.callData?.callType == "audio" ? (
          <IoCall
            onClick={() => {
              dispatch(setConversation({ _id: message?.conversationid }));
              dispatch(setCallOponent(otherUser));
              dispatch(setCallType("audio"));
              dispatch(setCallerUser(user?.email));
              dispatch(setIsCallSending(true));
            }}
            className="cursor-pointer"
          />
        ) : (
          <IoVideocam
            onClick={() => {
              dispatch(setConversation({ _id: message?.conversationid }));
              dispatch(setCallerUser(user?.email));
              dispatch(setCallOponent(otherUser));
              dispatch(setCallType("video"));
              dispatch(setIsCallSending(true));
            }}
            className="cursor-pointer"
          />
        )}
      </p>
    </div>
  );
}
