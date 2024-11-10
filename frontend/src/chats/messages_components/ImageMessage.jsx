import Loader from "../../images/Loader.gif";
const ImageMessage = () => {
  return (
    <>
      <div className="w-[200px] bg-[#1964dd4b] p-1 rounded-lg min-h-[280px]">
        <img
          className="w-full h-full object-cover  rounded-lg"
          src={Loader}
          alt=""
        />
      </div>
      <div className="w-[200px] ml-auto bg-[#31fc5d3e] p-1 rounded-lg min-h-[280px]">
        <img
          className="w-full h-full object-cover  rounded-lg"
          src={Loader}
          alt=""
        />
      </div>
    </>
  );
};

export default ImageMessage;
