/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaVideo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Call_Audio from "../Call_Audio";
import {
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

const MobileChatScreen = ({
  setmoreOptionOpen,
  moreOptionOpen,
  setinputText,
  inputText,
  handleSubmitButton,
  handleSendAudioMessage,
  groupedMessages,
}) => {
  const { oponentUser, conversation, allMessages } = useSelector(
    (state) => state.chat
  );
  const { activeUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current && groupedMessages.length > 0) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [groupedMessages]);

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
                  className="h-8 w-8 rounded-full bg-cover"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full bg-cover"
                  src={
                    oponentUser?.profileImage ||
                    "https://dootnode.themesbrand.website/assets/images/users/user-dummy-img.jpg"
                  }
                  alt=""
                />
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
            {/* <TextMessage />
            <PdfMessage />
            <DateDivider />
            <ImageMessage />
            <TextMessage /> */}
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
              <AudioRecorder
              handleSendAudioMessage={handleSendAudioMessage}
                oponentUse={oponentUser}
                conversation={conversation}
              />
              <MdSend
                onClick={() => {
                  handleSubmitButton({ key: "Enter" });
                }}
                className="text-3xl p-1 bg-primary rounded-md cursor-pointer text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileChatScreen;
