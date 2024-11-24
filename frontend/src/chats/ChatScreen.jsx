/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessages,
  handleMessageSend,
} from "../../helpers/messageFunctions";
import Transparent_Loader from "../components/Transparent_Loader";
import { setallMessages } from "../../store/slices/chatSlice";

import MobileChatScreen from "./screensForMobileAndDesktop/MobileChatScreen";
import DesktopChatScreen from "./screensForMobileAndDesktop/DesktopChatScreen";
import { useSocket } from "../SocketProvider";

const ChatScreen = () => {
  const [moreOptionOpen, setmoreOptionOpen] = useState(false);
  const { conversation, oponentUser, allMessages } = useSelector(
    (state) => state.chat
  );
  const [isRequesting, setisRequesting] = useState(true);
  const dispatch = useDispatch();
  const [groupedMessages, setgroupedMessages] = useState([]);
  const { socket } = useSocket();

  // data
  const [inputText, setinputText] = useState("");

  useEffect(() => {
    console.log(groupedMessages);
  }, [groupedMessages]);

  useEffect(() => {
    if (!socket) return;

    return () => {
      socket.off("progressMessage");
    };
  }, [socket, groupedMessages]);

  const getMessages = useCallback(async () => {
    setisRequesting(true);
    const res = await getAllMessages(conversation?._id);
    dispatch(setallMessages(res.data?.messages));
    setisRequesting(false);
  }, [oponentUser]);

  useEffect(() => {
    if (conversation) getMessages();
  }, [dispatch, conversation]);

  const handleSubmitButton = async (e) => {
    if (e.key == "Enter" && inputText.length > 0) {
      const res = await handleMessageSend(
        "text",
        inputText,
        oponentUser,
        conversation?._id
      );
      if (res.data?.success) setinputText("");
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleSubmitButton);

    return () => {
      window.removeEventListener("keypress", handleSubmitButton);
    };
  }, [inputText]);

  // grouped chats by date
  useEffect(() => {
    if (allMessages.length == 0) return;
    const groupedData = {};

    allMessages.forEach((message) => {
      const date = new Date(message.createdAt);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      const key = day + "-" + month + "-" + year;

      if (!groupedData[key]) {
        groupedData[key] = [];
      }

      groupedData[key].push(message);
    });

    Object.keys(groupedData).map((key) => {
      setgroupedMessages((prev) => [
        ...prev,
        {
          message: {
            type: "date",
            date: key,
          },
        },
      ]);

      groupedData[key].forEach((message) => {
        setgroupedMessages((prev) => [...prev, message]);
      });
    });
  }, [allMessages]);

  return (
    <>
      <div className="w-full ">
        {isRequesting && <Transparent_Loader />}
        <>
          {" "}
          {/* mobile chat screen  */}
          <MobileChatScreen
            handleMessageSend={handleMessageSend}
            inputText={inputText}
            setinputText={setinputText}
            moreOptionOpen={moreOptionOpen}
            setmoreOptionOpen={setmoreOptionOpen}
            handleSubmitButton={handleSubmitButton}
            groupedMessages={groupedMessages}
          />
        </>
        <DesktopChatScreen
          handleMessageSend={handleMessageSend}
          inputText={inputText}
          setinputText={setinputText}
          moreOptionOpen={moreOptionOpen}
          setmoreOptionOpen={setmoreOptionOpen}
          handleSubmitButton={handleSubmitButton}
          groupedMessages={groupedMessages}
        />

        {/* desktop chat screen  */}
      </div>
    </>
  );
};

export default ChatScreen;
