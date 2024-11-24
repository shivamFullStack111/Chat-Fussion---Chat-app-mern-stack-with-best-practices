/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Attachment from "./Attachment";
import Camera from "./Camera";
import Gallery from "./Gallery";
import Audio from "./Audio";
import Location from "./Location";

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
      <Attachment />
      <Camera />
      <Gallery />
      <Audio />
      <Location />

      {/* <div className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl  bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <MdContacts />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Contact
        </p>
      </div> */}
    </motion.div>
  );
};

export default MoreOption;
