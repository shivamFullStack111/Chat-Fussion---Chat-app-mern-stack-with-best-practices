import { MdCameraAlt } from "react-icons/md";
import { dbUrl, returnToken } from "../../utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegImages } from "react-icons/fa";
import { setallMessages } from "../../../store/slices/chatSlice";

function Gallery() {
  const [image, setimage] = useState();
  const { user } = useSelector((state) => state.user);
  const { oponentUser, conversation, allMessages } = useSelector(
    (state) => state.chat
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const uploadImage = async () => {
      try {
        const token = returnToken();

        const formdata = new FormData();

        formdata.append("file", image);

        formdata.append("conversationid", conversation._id);
        formdata.append("type", "video");
        formdata.append("receiver", oponentUser?.email);

        const res = await axios.post(
          `${dbUrl}/create-document-message`,
          formdata,
          {
            headers: { Authorization: token },
          }
        );
        if (res.data.success) {
          dispatch(
            setallMessages([
              ...allMessages,
              ...[...(res?.data?.messages || [])],
            ])
          );
        }
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
        type="file"
        onChange={(e) => setimage(e.target.files[0])}
        accept="image/*,video/*,audio/*"
        id="gallery"
      />
      <label htmlFor="gallery" className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <FaRegImages />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Gallery
        </p>
      </label>
    </>
  );
}

export default Gallery;
