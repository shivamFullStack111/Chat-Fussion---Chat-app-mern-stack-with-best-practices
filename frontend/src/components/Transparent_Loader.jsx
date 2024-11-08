import React from "react";
import Loader from "../images/Loader.gif";
const Transparent_Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center absolute top-0 left-0 bg-[#0001]">
      <img className="w-32 h-32 " src={Loader} alt={"Loading..."} />
    </div>
  );
};

export default Transparent_Loader;
