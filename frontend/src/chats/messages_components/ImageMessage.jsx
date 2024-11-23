import { useSelector } from "react-redux";
import Loader from "../../images/Loader.gif";
import { useState } from "react";
const ImageMessage = ({ message }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user?.email == message?.sender ? (
        <div className="w-[200px] ml-auto bg-[#31fc5d3e] p-1 rounded-lg min-h-[280px]">
          <img
            className="w-full h-full object-cover  rounded-lg"
            src={message?.message?.url}
            alt=""
          />
        </div>
      ) : (
        <div className="w-[200px] bg-[#1964dd4b] p-1 rounded-lg min-h-[280px]">
          <img
            className="w-full h-full object-cover  rounded-lg"
            src={message?.message?.url}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default ImageMessage;
