/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeadphones, FaRegImages } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdCameraAlt, MdContacts, MdOutlineAttachment } from "react-icons/md";
import { dbUrl, returnToken } from "../utils";
import { useSelector } from "react-redux";
import axios from "axios";

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

export default MoreOption;

function Attachment() {
  const { user } = useSelector((state) => state.user);
  const { oponentUser, conversation } = useSelector((state) => state.chat);

  return (
    <>
      {" "}
      <input
        id="attachment"
        className="hidden"
        onChange={async (e) => {
          let array = Array.from(e.target.files);

          const token = returnToken();

          const formdata = new FormData();

          array.forEach((file) => {
            formdata.append("file", file);
          });
          formdata.append("conversationid", conversation._id);
          formdata.append("type", "document");
          formdata.append("receiver", oponentUser?.email);

          const res = await axios.post(
            `${dbUrl}/create-document-message`,
            formdata,
            { headers: { Authorization: token } }
          );

          console.log(res.data);
        }}
        multiple
        type="file"
      />
      <label htmlFor="attachment" className="flex flex-col items-center">
        <div className="p-2  1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <MdOutlineAttachment />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Attachment
        </p>
      </label>
    </>
  );
}

function Camera() {
  const [image, setimage] = useState();
  const { user } = useSelector((state) => state.user);
  const { oponentUser, conversation } = useSelector((state) => state.chat);

  useEffect(() => {
    const uploadImage = async () => {
      try {
        const token = returnToken();

        const formdata = new FormData();

        formdata.append("file", image);

        formdata.append("conversationid", conversation._id);
        formdata.append("type", "image");
        formdata.append("receiver", oponentUser?.email);

        const res = await axios.post(
          `${dbUrl}/create-image-message`,
          formdata,
          { headers: { Authorization: token } }
        );

        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (image) {
      uploadImage();
    }
  }, [image]);
  return (
    <>
      <input
        className="hidden"
        id="camera"
        accept="image/*"
        type="file"
        capture={"environment"}
        onChange={(e) => setimage(e.target.files[0])}
      />
      <label htmlFor="camera" className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <MdCameraAlt />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Camera
        </p>
      </label>
    </>
  );
}
