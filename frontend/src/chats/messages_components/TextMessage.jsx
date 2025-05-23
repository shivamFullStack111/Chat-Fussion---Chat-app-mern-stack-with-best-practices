import { useSelector } from "react-redux";

const TextMessage = ({ message }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {" "}
      {user?.email == message?.sender ? (
        <div className=" text-gray-300  pt-3  flex ">
          <span className="bg-[#31fc5d3e] rounded-tl-xl  rounded-br-xl  max-w-[60%]    rounded-tr-md p-2 ml-auto backdrop-blur-[2px]">
            {" "}
            {message?.message?.text}
          </span>
        </div>
      ) : (
        <div className=" text-gray-300   flex ">
          <div className="bg-[#1964dd4b]  rounded-tl-md inline max-w-[60%]    rounded-bl-xl   rounded-tr-xl  p-2 backdrop-blur-[2px]">
            {" "}
          
            {message?.message?.text}
          </div>
        </div>
      )}
    </>
  );
};

export default TextMessage;
