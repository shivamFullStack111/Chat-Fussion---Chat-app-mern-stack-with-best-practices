import React from "react";
import whatsappbg from "../images/whatsappbg.png";
import { FaPhoneAlt, FaSearch, FaVideo, FaVoicemail } from "react-icons/fa";
import {
  PiDotsThreeOutlineFill,
  PiDotsThreeOutlineVerticalFill,
  PiSmiley,
} from "react-icons/pi";
import { MdDownload, MdOutlineAttachment, MdOutlineKeyboardVoice, MdSend } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

const ChatScreen = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url('${whatsappbg}')`,
        }}
        className="h-full max-1000px:hidden w-full relative flex flex-col   bg-cover bg-no-repeat "
      >
        <div className="w-full h-20 bg-[#0004]  backdrop-blur-md flex justify-between items-center">
          <div className="flex px-4 items-center gap-2">
            <img
              className="h-10 w-10 rounded-full bg-cover"
              src="https://dootnode.themesbrand.website/assets/images/users/user-dummy-img.jpg"
              alt=""
            />
            <div>
              <p className="text-gray-400 tracking-wide font-semibold">Karan</p>
              <p className="text-[12px] text-gray-500">
                last seen 28-1-2023 , 7:31 pm
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
        <div className="w-full h-full overflow-y-scroll py-2 flex flex-col gap-2 px-2">
          <TextMessage />
          <TextMessage />
          <DateDivider />
          <TextMessage />
          <TextMessage />
        </div>
        {/* bottom  */}
        <div className="h-[60px] min-w-[100%] max-1000px:hidden gap-4 max-w-[100%] bg-darkbg flex p-2 mt-auto bottom-0 items-center text-gray-400 justify-between">
          <div className="flex text-lg gap-2 items-center">
            <PiDotsThreeOutlineFill />
            <PiSmiley className="text-2xl" />
          </div>
          <div className="bg-darkbg_2 w-full h-full rounded-md px-3 flex items-center gap-2">
            <input
              placeholder="Type your message..."
              className="w-full bg-transparent outline-none  h-full"
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineKeyboardVoice className="text-3xl p-1 bg-darkbg_2 rounded-md cursor-pointer text-white" />
            <MdSend className="text-3xl p-1 bg-primary rounded-md cursor-pointer text-white" />
          </div>
        </div>
      </div>

      {/* mobile chat screen  */}
      <div className="fixed 1000px:hidden bg-darkbg_2 w-full h-full top-0 left-0 z-50">
        <div
          style={{
            // backgroundImage: `url('${whatsappbg}')`,
          }}
          className="h-full  w-full relative flex flex-col   bg-cover bg-no-repeat "
        >
          {/* header  */}
          <div className="w-full h-16 px-2 bg-[#0004]  backdrop-blur-md flex justify-between items-center">
            <div className="flex  items-center gap-2">
              <FaArrowLeftLong className="text-gray-300 mr-2" />
              <img
                className="h-8 w-8 rounded-full bg-cover"
                src="https://dootnode.themesbrand.website/assets/images/users/user-dummy-img.jpg"
                alt=""
              />
              <div>
                <p className="text-gray-400 text-sm tracking-wide font-semibold">
                  Karan
                </p>
                <p className="text-[12px] leading-tight tracking-tight text-gray-500">
                  last seen 28-1-2023 , 7:31 pm
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
          <div className="w-full h-full overflow-y-scroll py-2 flex flex-col gap-2 px-2">
            <TextMessage />
            <PdfMessage />
            <DateDivider />
            <TextMessage />
          </div>
          {/* bottom  */}
          <div className="h-[60px] min-w-[100%]  gap-4 max-w-[100%] bg-darkbg flex p-2 mt-auto bottom-0 items-center text-gray-400 justify-between">
            <div className="flex text-lg gap-2 items-center">
              <PiDotsThreeOutlineFill />
              <PiSmiley className="text-2xl" />
            </div>
            <div className="bg-darkbg_2 w-full h-full rounded-md px-3 flex items-center gap-2">
              <input
                placeholder="Type your message..."
                className="w-full bg-transparent outline-none  h-full"
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineKeyboardVoice className="text-3xl p-1 bg-darkbg_2 rounded-md cursor-pointer text-white" />
              <MdSend className="text-3xl p-1 bg-primary rounded-md cursor-pointer text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatScreen;

const TextMessage = () => {
  return (
    <>
      {" "}
      <div className=" text-gray-300   flex ">
        <div className="bg-[#1964dd4b]  rounded-tl-md inline max-w-[60%]    rounded-bl-xl   rounded-tr-xl  p-2 backdrop-blur-[2px]">
          {" "}
          hii dear . Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Culpa nostrum consequatur totam modi deserunt. Asperiores debitis ab
          reprehenderit totam error cupiditate a dolorum nisi quam? A corporis,
          hic odio enim culpa laborum deleniti aut assumenda ab ratione magnam
          voluptatibus tempore asperiores temporibus quos illo, soluta optio
          voluptatem suscipit, ea beatae?
        </div>
      </div>
      <div className=" text-gray-300  pt-3  flex ">
        <span className="bg-[#31fc5d3e] rounded-tl-xl  rounded-br-xl  max-w-[60%]    rounded-tr-md p-2 ml-auto backdrop-blur-[2px]">
          {" "}
          hii dear Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Temporibus quibusdam provident nostrum quisquam repellendus,
          architecto minima, excepturi, molestias suscipit voluptatibus
          voluptates perferendis beatae obcaecati? Voluptate vitae soluta
          laboriosam, illo aspernatur labore! Eveniet odit impedit velit in
          natus cum placeat itaque aspernatur, nisi fugiat, autem nemo, commodi
          esse. Quo, incidunt dolore?
        </span>
      </div>
    </>
  );
};

const DateDivider = ({ date }) => {
  return (
    <div className="flex items-center gap-2 text-white justify-center">
      <p className="h-[2px] bg-gray-400 w-[35%] "></p>
      <p className="text-sm bg-black px-2 py-1 rounded-md">3 july 2024</p>
      <p className="h-[2px] bg-gray-400 w-[35%] "></p>
    </div>
  );
};

const PdfMessage = () => {
  return (
    <div className="p-2 max-w-[60%] rounded-lg bg-[#31fc5d3e]">
      <div className="flex  border-2 border-green-500 p-2 gap-1  rounded-md justify-between items-center">
        <MdOutlineAttachment className="text-green-500 text-[35px] rounded-full  bg-[#31fc5d26] p-2"/>
        <p className="text-sm text-darkbg_2">No 2838 jhhd...</p>
        <MdDownload className="text-2xl"/>
      </div>
    </div>
  );
};
