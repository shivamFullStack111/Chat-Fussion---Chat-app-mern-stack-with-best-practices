/* eslint-disable react/prop-types */
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaVideo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Call_Audio from "../Call_Audio";
import {
  setCallerUser,
  setCallOponent,
  setCallType,
  setIsCallSending,
} from "../../../store/slices/callSlice";
import {
  PiDotsThreeOutlineFill,
  PiDotsThreeOutlineVerticalFill,
  PiSmiley,
} from "react-icons/pi";
import DateDivider from "../messages_components/DateDivider";
import TextMessage from "../messages_components/TextMessage";
import Audio_message from "../messages_components/Audio_message";
import ImageMessage from "../messages_components/ImageMessage";
import PdfMessage from "../messages_components/PdfMessage";
import MoreOption from "../moreOption/MoreOption";
import AudioRecorder from "../AudioRecorder";
import { MdSend } from "react-icons/md";
import LocationMessage from "../messages_components/LocationMessage";
import EmojiPicker from "emoji-picker-react";

const DesktopChatScreen = ({
  moreOptionOpen,
  setmoreOptionOpen,
  setinputText,
  inputText,
  handleSubmitButton,
  groupedMessages,
  handleSendAudioMessage,
}) => {
  const { oponentUser, conversation, allMessages } = useSelector(
    (state) => state.chat
  );
  const { activeUsers,user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [emojiOpen, setemojiOpen] = useState(false);

  useEffect(() => {
    if (scrollRef.current && groupedMessages.length > 0) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [groupedMessages,allMessages]);

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
            <Call_Audio oponentUser={oponentUser} />
            <FaVideo
              onClick={() => {
                dispatch(setCallOponent(oponentUser));
                dispatch(setCallType("video"));
                dispatch(setIsCallSending(true));
                dispatch(setCallerUser(user?.email))
              }}
            />
            <PiDotsThreeOutlineVerticalFill />
          </div>
        </div>
        {/* messages  */}
        <div
          ref={scrollRef}
          className="w-full h-full relative overflow-y-scroll scroll-smooth py-2 flex flex-col gap-2 px-2"
        >
          {groupedMessages?.map((message, i) => {
            if (message?.message?.type == "date")
              return <DateDivider key={i} date={message?.message?.date} />;
            if (message?.message?.type == "text")
              return <TextMessage message={message} key={i} />;

            if (message?.message?.type == "audio")
              return <Audio_message key={i} message={message} />;

            if (message?.message?.type == "image")
              return <ImageMessage key={i} message={message} />;

            if (message?.message?.type == "document")
              return <PdfMessage key={i} message={message} />;
          })}
        </div>
        {/* more options like document camera audio pdf etc...  */}
        <MoreOption
          moreOptionOpen={moreOptionOpen}
          setmoreOptionOpen={setmoreOptionOpen}
        />
        {/* bottom  */}
        <div className="h-[60px] relative min-w-[100%] z-30 max-1000px:hidden gap-4 max-w-[100%] bg-darkbg flex p-2 mt-auto bottom-0 items-center text-gray-400 justify-between">
          <div className="absolute bottom-20  z-50">
            {" "}
            <EmojiPicker
              onEmojiClick={(e) => setinputText((p) => p + e.emoji)}
              open={emojiOpen}
              height={500}
              className="bg-darkbg"
              style={{ backgroundClip: "black" }}
              theme="dark"
            />
          </div>
          <div className="flex text-lg gap-2 items-center">
            <PiDotsThreeOutlineFill
              className="cursor-pointer"
              onClick={() => setmoreOptionOpen((p) => !p)}
            />
            <PiSmiley
              onClick={() => setemojiOpen((p) => !p)}
              className={`text-2xl ${
                emojiOpen && "rotate-180"
              } transition-all duration-200 cursor-pointer hover:text-white`}
            />
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
            <AudioRecorder
              handleSendAudioMessage={handleSendAudioMessage}
              oponentUse={oponentUser}
              conversation={conversation}
            />
            <MdSend
              onClick={() => {
                handleSubmitButton({ key: "Enter" });
                setemojiOpen(false);
              }}
              className="text-3xl p-1  bg-primary rounded-md cursor-pointer text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopChatScreen;
