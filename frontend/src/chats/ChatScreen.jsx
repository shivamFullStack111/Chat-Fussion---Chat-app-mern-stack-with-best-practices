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
import { dbUrl, returnToken } from "../utils";
import axios from "axios";

const ChatScreen = () => {
  const [moreOptionOpen, setmoreOptionOpen] = useState(false);
  const { conversation, oponentUser, allMessages } = useSelector(
    (state) => state.chat
  );
  const [isRequesting, setisRequesting] = useState(true);
  const dispatch = useDispatch();
  const [groupedMessages, setgroupedMessages] = useState([]);
  // this is use when new message come from another user then we can cheack date is already in this is object or not
  const [groupDataForKeyCheck, setgroupDataForKeyCheck] = useState({});
  const { socket } = useSocket();

  // data
  const [inputText, setinputText] = useState("");

  useEffect(() => {
    console.log("groupedMessages length", groupedMessages);
  }, [groupedMessages]);

  useEffect(() => {
    if (!socket || !groupDataForKeyCheck) return;

    socket.on("newMessage", (message) => {
      const date = new Date(message.createdAt);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      const key = day + "-" + month + "-" + year;
      console.log(key);
      if (!groupDataForKeyCheck[key]) {
        setgroupedMessages((prev) => [
          ...prev,
          {
            type: "date",
            date: key,
          },
          message,
        ]);
        return;
      } else {
        setgroupedMessages((prev) => [...prev, message]);
        return;
      }

      // if (message?.conversationid == conversation?._id) {
      // }
    });
  }, [socket]);

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
      if (res.data?.success) {
        setinputText("");
        setgroupedMessages((prev) => [...prev, res.data?.mssg]);
      }
    }
  };

  const handleSendAudioMessage = async (audioBlob) => {
    try {
      const token = returnToken();
      const formdata = new FormData();
      formdata.append("type", "audio");
      formdata.append("receiver", oponentUser);
      formdata.append("conversationid", conversation?._id);
      formdata.append("file", audioBlob);

      const res = await axios.post(`${dbUrl}/create-message`, formdata, {
        headers: { Authorization: token },
      });

      if (res.data?.success) {
        setgroupedMessages((prev) => [...prev, res.data?.mssg]);
      }
    } catch (error) {
      console.log(error.message);
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
    setgroupDataForKeyCheck(groupedData);
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
            handleSendAudioMessage={handleSendAudioMessage}
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
          handleSendAudioMessage={handleSendAudioMessage}
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
