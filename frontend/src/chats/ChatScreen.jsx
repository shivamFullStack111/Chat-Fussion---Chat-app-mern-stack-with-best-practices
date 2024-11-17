/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaSearch, FaVideo } from "react-icons/fa";
import {
  PiDotsThreeOutlineFill,
  PiDotsThreeOutlineVerticalFill,
  PiSmiley,
} from "react-icons/pi";
import { MdOutlineKeyboardVoice, MdSend } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import TextMessage from "./messages_components/TextMessage";
import DateDivider from "./messages_components/DateDivider";
import MoreOption from "./MoreOption";
import PdfMessage from "./messages_components/PdfMessage";
import ImageMessage from "./messages_components/ImageMessage";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../../helpers/messageFunctions";
import Transparent_Loader from "../components/Transparent_Loader";
import {
  setallMessages,
  setOponentUser,
  setIsChatOpen,
  setConversation,
} from "../../store/slices/chatSlice";
import moment from "moment";

const ChatScreen = () => {
  const [moreOptionOpen, setmoreOptionOpen] = useState(false);
  const { oponentUser,  } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [isRequesting, setisRequesting] = useState(true);
  const dispatch = useDispatch();
  const [inputText, setinputText] = useState("");

  const handleMessageSend = () => {
    alert("message send");
  };

  useEffect(() => {
    const getMessages = async () => {
      setisRequesting(true);
      const res = await getAllMessages();
      dispatch(setallMessages(res.data?.messages));
      setisRequesting(false);
    };
    if (oponentUser) getMessages();
  }, [oponentUser]);

  useEffect(() => {
    const handleSubmitButton = (e) => {
      if (e.key === "Enter" && inputText.length > 0) {
        handleMessageSend();
      }
    };

    window.addEventListener("keypress", handleSubmitButton);

    return () => {
      window.removeEventListener("keypress", handleSubmitButton);
    };
  }, [inputText]);

  return (
    <>
      <div className="">
        {isRequesting && <Transparent_Loader />}

        {/* desktop chat screen  */}
        <DesktopChatScreen
          handleMessageSend={handleMessageSend}
          inputText={inputText}
          setinputText={setinputText}
          moreOptionOpen={moreOptionOpen}
          setmoreOptionOpen={setmoreOptionOpen}
        />
        {/* mobile chat screen  */}
        <MobileChatScreen
          handleMessageSend={handleMessageSend}
          inputText={inputText}
          setinputText={setinputText}
          moreOptionOpen={moreOptionOpen}
          setmoreOptionOpen={setmoreOptionOpen}
        />
      </div>
    </>
  );
};

export default ChatScreen;

const DesktopChatScreen = ({
  moreOptionOpen,
  setmoreOptionOpen,
  setinputText,
  inputText,
  handleMessageSend,
}) => {
  const { oponentUser } = useSelector((state) => state.chat);
  const { activeUsers } = useSelector((state) => state.user);
  const [isActive, setisActive] = useState(false);

  return (
    <>
      {" "}
      <div
        style={
          {
            // backgroundImage: `url('${whatsappbg}')`,
          }
        }
        className="h-full z-10 max-1000px:hidden w-full bg-darkbg relative flex flex-col   bg-cover bg-no-repeat "
      >
        <div className="w-full h-20 bg-[#0004]  backdrop-blur-md flex justify-between items-center">
          <div className="flex px-4 items-center gap-2">
            <img
              className="h-10 w-10 rounded-full bg-cover"
              src={
                oponentUser?.profileImage ||
                "https://dootnode.themesbrand.website/assets/images/users/user-dummy-img.jpg"
              }
              alt=""
            />
            <div>
              <p className="text-gray-400 tracking-wide font-semibold">
                {oponentUser?.name}
              </p>
              <p className="text-[12px] text-gray-500">
                {activeUsers?.includes(oponentUser?.email) ? (
                  <>
                    <p className="text-[12px] text-green-400">online</p>
                  </>
                ) : (
                  <>
                    {oponentUser?.lastActive &&
                      moment(oponentUser?.lastActive).format("LLL")}
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-6 mr-5 text-xl text-gray-300 items-center">
            <FaSearch />
            <FaPhoneAlt />
            <FaVideo />
            <PiDotsThreeOutlineVerticalFill />
          </div>
        </div>
        {/* messages  */}
        <div className="w-full h-full relative overflow-y-scroll scroll-smooth py-2 flex flex-col gap-2 px-2">
          <TextMessage />
          <DateDivider />
          <ImageMessage />
          <PdfMessage />
          <DateDivider />
        </div>
        {/* more options like document camera audio pdf etc...  */}
        <MoreOption
          moreOptionOpen={moreOptionOpen}
          setmoreOptionOpen={setmoreOptionOpen}
        />
        {/* bottom  */}
        <div className="h-[60px] min-w-[100%] z-30 max-1000px:hidden gap-4 max-w-[100%] bg-darkbg flex p-2 mt-auto bottom-0 items-center text-gray-400 justify-between">
          <div className="flex text-lg gap-2 items-center">
            <PiDotsThreeOutlineFill
              className="cursor-pointer"
              onClick={() => setmoreOptionOpen((p) => !p)}
            />
            <PiSmiley className="text-2xl" />
          </div>
          <div className="bg-darkbg_2 w-full h-full rounded-md px-3 flex items-center gap-2">
            <input
              value={inputText}
              placeholder="Type your message..."
              onChange={(e) => setinputText(e.target.value)}
              className="w-full bg-transparent outline-none  h-full"
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineKeyboardVoice className="text-3xl p-1 bg-darkbg_2 rounded-md cursor-pointer text-white" />
            <MdSend
              onClick={handleMessageSend}
              className="text-3xl p-1  bg-primary rounded-md cursor-pointer text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const MobileChatScreen = ({
  setmoreOptionOpen,
  moreOptionOpen,
  setinputText,
  inputText,
  handleMessageSend,
}) => {
  const { oponentUser } = useSelector((state) => state.chat);
  const { activeUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <div className="fixed 1000px:hidden bg-darkbg_2 w-full h-full top-0 left-0 z-50">
        <div
          style={
            {
              // backgroundImage: `url('${whatsappbg}')`,
            }
          }
          className="h-full  w-full relative flex flex-col   bg-cover bg-no-repeat "
        >
          {/* header  */}
          <div className="w-full h-16 px-2 bg-[#0004]  backdrop-blur-md flex justify-between items-center">
            <div className="flex  items-center gap-2">
              <FaArrowLeftLong
                onClick={() => {
                  dispatch(setallMessages([]));
                  dispatch(setOponentUser(null));
                  dispatch(setConversation(null));
                  dispatch(setIsChatOpen(false));
                }}
                className="text-gray-300 cursor-pointer mr-2"
              />
              <img
                className="h-8 w-8 rounded-full bg-cover"
                src={
                  oponentUser?.profileImage ||
                  "https://dootnode.themesbrand.website/assets/images/users/user-dummy-img.jpg"
                }
                alt=""
              />
              <div>
                <p className="text-gray-400 text-sm tracking-wide font-semibold">
                  {oponentUser?.name}
                </p>
                <p className="text-[12px] leading-tight tracking-tight text-gray-500">
                  {activeUsers?.includes(oponentUser?.email) ? (
                    <>
                      <p className="text-[12px] text-green-400">online</p>
                    </>
                  ) : (
                    <>
                      {oponentUser?.lastActive &&
                        moment(oponentUser?.lastActive).format("LLL")}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-3 500px:gap-4 700px:gap-5 800px:gap-6  text-lg 500px:text-xl text-gray-300 items-center">
              {/* <FaSearch  /> */}
              <FaPhoneAlt />
              <FaVideo />
              <PiDotsThreeOutlineVerticalFill />
            </div>
          </div>

          {/* messages  */}
          <div className="w-full h-full overflow-y-scroll scroll-smooth py-2 flex flex-col gap-2 px-2">
            <TextMessage />
            <PdfMessage />
            <DateDivider />
            <ImageMessage />
            <TextMessage />
          </div>
          <MoreOption
            moreOptionOpen={moreOptionOpen}
            setmoreOptionOpen={setmoreOptionOpen}
          />
          {/* bottom  */}
          <div className="h-[60px] min-w-[100%] z-30  gap-4 max-w-[100%] bg-darkbg flex p-2 mt-auto bottom-0 items-center text-gray-400 justify-between">
            <div className="flex text-lg gap-2 items-center">
              <PiDotsThreeOutlineFill
                className="cursor-pointer"
                onClick={() => setmoreOptionOpen((p) => !p)}
              />
              <PiSmiley className="text-2xl" />
            </div>
            <div className="bg-darkbg_2 w-full h-full rounded-md px-3 flex items-center gap-2">
              <input
                value={inputText}
                placeholder="Type your message..."
                onChange={(e) => setinputText(e.target.value)}
                className="w-full bg-transparent outline-none  h-full"
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineKeyboardVoice className="text-3xl p-1 bg-darkbg_2 rounded-md cursor-pointer text-white" />
              <MdSend
                onClick={handleMessageSend}
                className="text-3xl p-1 bg-primary rounded-md cursor-pointer text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
