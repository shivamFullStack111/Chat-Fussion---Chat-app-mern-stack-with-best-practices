/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaHeadphones, FaRegImages } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdCameraAlt, MdContacts, MdOutlineAttachment } from "react-icons/md";

const MoreOption = ({ moreOptionOpen, setmoreOptionOpen }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.4 }}
      animate={{
        y: moreOptionOpen ? -50 : 50,
        opacity: moreOptionOpen ? 1 : 0,
      }}
      className=" w-full absolute bottom-0 right-0 z-10 bg-darkbg_2 flex justify-between py-2 px-[6vw] items-center"
    >
      <div className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <MdOutlineAttachment />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Attachment
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <MdCameraAlt />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Camera
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <FaRegImages />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Gallery
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <FaHeadphones />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Audio
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <FaLocationCrosshairs />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Location
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl  bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <MdContacts />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Contact
        </p>
      </div>
    </motion.div>
  );
};

export default MoreOption