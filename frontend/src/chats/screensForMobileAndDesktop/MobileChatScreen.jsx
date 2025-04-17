/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {  FaVideo } from "react-icons/fa";
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
import {
  setallMessages,
  setConversation,
  setIsChatOpen,
  setOponentUser,
} from "../../../store/slices/chatSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import LocationMessage from "../messages_components/LocationMessage";
import EmojiPicker from "emoji-picker-react";
import { FiLoader } from "react-icons/fi";

const MobileChatScreen = ({
  setmoreOptionOpen,
  moreOptionOpen,
  setinputText,
  inputText,
  handleSubmitButton,
  handleSendAudioMessage,
  groupedMessages,
  isImageShow,
}) => {
  const { oponentUser, conversation, allMessages } = useSelector(
    (state) => state.chat
  );
  const { activeUsers, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [emojiOpen, setemojiOpen] = useState(false);
  const [isSending, setisSending] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && groupedMessages.length > 0) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [groupedMessages, allMessages]);

  return (
    <>
      <div className="fixed 1000px:hidden bg-darkbg_2 w-full h-full top-0 left-0 z-50 ">
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
              {conversation?.type == "group" ? (
                <img
                  className="h-8 w-8 object-cover rounded-full bg-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLurOKOnrd7Q0-lQGBiF-6e8XBbf9dp2roQg&s"
                  alt=""
                />
              ) : (
                <>
                  {isImageShow && oponentUser?.profileImage ? (
                    <img
                      className="h-8 w-8 rounded-full bg-cover"
                      src={oponentUser?.profileImage}
                    />
                  ) : (
                    <div className="h-8 w-8 uppercase flex justify-center items-center rounded-full bg-pink-400 text-black ">
                      {oponentUser?.name[0]}
                    </div>
                  )}
                </>
              )}

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
                        oponentUser?.lastSeen &&
                        moment(oponentUser?.lastActive).format("LLL")}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex gap-3 500px:gap-4 700px:gap-5 800px:gap-6  text-lg 500px:text-xl text-gray-300 items-center">
              {/* <FaSearch  /> */}

              <Call_Audio oponentUser={oponentUser} />
              <FaVideo
                onClick={() => {
                  dispatch(setCallerUser(user?.email));
                  dispatch(setCallOponent(oponentUser));
                  dispatch(setCallType("video"));
                  dispatch(setIsCallSending(true));
                }}
              />
              <PiDotsThreeOutlineVerticalFill />
            </div>
          </div>

          {/* messages  */}
          <div
            style={{ overflowY: "scroll" }}
            ref={scrollRef}
            className="w-full h-full   py-2 flex flex-col gap-2 px-2"
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

              if (message?.message?.type == "current-location")
                return <LocationMessage key={i} message={message} />;
            })}
          </div>
          <MoreOption
            moreOptionOpen={moreOptionOpen}
            setmoreOptionOpen={setmoreOptionOpen}
          />

          {/* bottom  */}
          <div className="h-[60px] relative min-w-[100%] z-30  gap-4 max-w-[100%] bg-darkbg flex p-2 mt-auto bottom-0 items-center text-gray-400 justify-between">
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
              {!isSending && (
                <MdSend
                  onClick={async () => {
                    setisSending(true);
                    await handleSubmitButton({ key: "Enter" });
                    setemojiOpen(false);
                    setisSending(false);
                  }}
                  className="text-3xl p-1 bg-primary rounded-md cursor-pointer text-white"
                />
              )}
              {isSending && (
                <div className="text-2xl  p-1 bg-primary rounded-md cursor-pointer text-white">
                  {" "}
                  <FiLoader className="animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileChatScreen;
