import React, { useEffect, useRef } from "react";

const VideoRenderingScreenOnCall = ({
  oponentVideoRef,
  isRecevingPage,
  handleAcceptCall,
}) => {
  const myVideoRef = useRef(null);

  useEffect(() => {
    const getMyStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        myVideoRef.current.srcObject = stream;
      } catch (error) {
        console.log(error.message);
      }
    };
    getMyStream();
  }, []);
  return (
    <div
      style={{ zIndex: 100 }}
      className="w-full rounded-lg bg-white h-full absolute "
    >
      <div className="w-full h-full relative rounded-lg ">
        <video
          ref={oponentVideoRef && oponentVideoRef}
          // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          className="w-full h-full rounded-lg"
          autoPlay
          loop
        ></video>
        <div
          style={{ zIndex: 110 }}
          className=" absolute bottom-0 h-28  flex justify-center items-center   w-full"
        >
          <div
            onClick={() => {
              if (isRecevingPage) {
                handleAcceptCall();
              }
            }}
            className={`h-14 w-14 rounded-full cursor-pointer ${
              isRecevingPage ? "bg-green-500" : "bg-red-500"
            } `}
          ></div>
        </div>
        <div
          style={{ zIndex: 110 }}
          className="h-40 w-28 rounded-lg  absolute bottom-3 right-3"
        >
          <video
            ref={myVideoRef}
            muted
            // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            className="w-full h-full border-2 rounded-lg"
            autoPlay
            loop
          ></video>
          {/* <video src="" className="w-full h-full rounded-lg" ref={myVideoRef}></video> */}
        </div>
      </div>
    </div>
  );
};

export default VideoRenderingScreenOnCall;
