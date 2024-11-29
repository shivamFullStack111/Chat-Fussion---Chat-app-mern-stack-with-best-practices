import { easeInOut, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSocket } from "../SocketProvider";
import { useSelector } from "react-redux";
const NewMessage_Notification = () => {
  const { socket } = useSocket();
  const [isNotificationOpen, setisNotificationOpen] = useState(false);
  const [message, setmessage] = useState(null);
  const [oponent, setoponent] = useState(null);
  const { allUsers } = useSelector((state) => state.user);

  useEffect(() => {
    let timeout;
    if (isNotificationOpen && message) {
      timeout = setTimeout(() => {
        setisNotificationOpen(false);
        setmessage(null);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [isNotificationOpen, message]);

  useEffect(() => {
    if (!socket || !allUsers?.length) return;

    socket.on("newMessage", (message) => {
      const opnt = allUsers?.find((usr) => usr?.email == message?.sender);
      setoponent(opnt);
      setmessage(message);
      setisNotificationOpen(true);
    });

    return () => socket.off("newMessage");
  }, [socket, allUsers]);

  return (
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: isNotificationOpen ? 0 : -200 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="z-50 absolute bg-darkbg_2 p-2  top-4 left-0 w-[95%] ml-[2.5vw] border border-gray-700 rounded-xl"
    >
      <div className="flex gap-3 items-center">
        <img
          className="h-7 w-7 rounded-full bg-white"
          src={oponent?.profileImage}
          alt=""
        />
        <p className="font-semibold text-gray-200">{oponent?.name}</p>
      </div>

      {message?.message.type === "text" && (
        <div className="text-[12px] p-2 text-gray-300  ">
          {message?.message?.text}
        </div>
      )}

      {message?.message?.type == "image" && (
        <div className=" flex justify-center">
          {" "}
          <img
            className="w-12 h-20 rounded-md"
            src={message?.message?.url}
            alt=""
          />
        </div>
      )}
      {message?.message?.type == "audio" && (
        <div className="">
          {" "}
          <img
            className="w-12 h-8 rounded-md"
            src={
              "data:image/png;base64,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"
            }
            alt=""
          />
        </div>
      )}
      {message?.message?.type == "document" && (
        <div className="">
          {" "}
          <img
            className="w-8 h-8 rounded-md"
            src={
              "data:image/png;base64,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"
            }
            alt=""
          />
        </div>
      )}
      {message?.message?.type == "video" && (
        <div className="">
          {" "}
          <img
            className="w-8 h-8 rounded-md"
            src={
              "data:image/png;base64,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"
            }
            alt=""
          />
        </div>
      )}
      {message?.message?.type == "current-location" && (
        <div className="">
          {" "}
          <img
            className="w-8 h-8 rounded-md"
            src={
              "data:image/png;base64,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"
            }
            alt=""
          />
        </div>
      )}
    </motion.div>
  );
};

export default NewMessage_Notification;
