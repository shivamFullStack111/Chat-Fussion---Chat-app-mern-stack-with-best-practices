import { useSelector } from "react-redux";

const Audio_message = ({ message }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {" "}
      {user?.email == message?.sender ? (
        <div className=" text-gray-300  pt-3  flex ">
          <span className="bg-[#31fc5d3e] rounded-tl-xl  rounded-br-xl  max-w-[60%]    rounded-tr-md p-2 ml-auto backdrop-blur-[2px]">
            {" "}
            <audio
              src={message?.message?.url}
              // src="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
              controls
              className="w-44 h-8"
            ></audio>
          </span>
        </div>
      ) : (
        <div className=" text-gray-300   flex ">
          <div className="bg-[#1964dd4b]  rounded-tl-md inline max-w-[60%]    rounded-bl-xl   rounded-tr-xl  p-2 backdrop-blur-[2px]">
            {" "}
            <audio

              src={message?.message?.url}
              // src="https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
              controls
              className="w-44 h-8"
            ></audio>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default Audio_message;
