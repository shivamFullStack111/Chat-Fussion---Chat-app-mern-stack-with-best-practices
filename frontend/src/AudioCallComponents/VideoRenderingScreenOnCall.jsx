import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosCall } from "react-icons/io";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { GiSpeakerOff } from "react-icons/gi";
import { IoVideocamOffOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useSocket } from "../SocketProvider";

const VideoRenderingScreenOnCall = ({
  oponentVideoRef,
  isRecevingPage,
  handleAcceptCall,
}) => {
  const myVideoRef = useRef(null);
  const [isMute, setisMute] = useState(false);
  const [isVideoOff, setisVideoOff] = useState(false);
  const { socket } = useSocket();

  const [oponentIsVideoAndAudioOpen, setoponentIsVideoAndAudioOpen] = useState({
    audio: true,
    video: true,
  });

  const { call_oponent } = useSelector((state) => state.call);
  const innderHeight = window.innerHeight;

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

  useEffect(() => {
    socket.emit("handleMyVideoAudio", {
      video: !isVideoOff,
      audio: !isMute,
      to: call_oponent?.email,
    });
  }, [isMute, isVideoOff]);

  useEffect(() => {
    if (!socket) return;

    socket.on("oponentAudioAndVideoIsOn", ({ video, audio }) => {
      setoponentIsVideoAndAudioOpen({
        video,
        audio,
      });
      if (!video) {
        oponentVideoRef.current.pause();
      } else {
        oponentVideoRef.current.play();
      }
    });
  }, [socket]);
  return (
    <div
      style={{ zIndex: 100 }}
      className="w-full 350px:rounded-lg bg-darkbg_2 border-2 h-full absolute "
    >
      <div className="w-full h-full relative rounded-lg ">
        <video
          muted={!oponentIsVideoAndAudioOpen?.audio}
          ref={oponentVideoRef && oponentVideoRef}
          // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          className="w-full h-full rounded-lg"
          autoPlay
          loop
        ></video>
        <div
          style={{ zIndex: 110 }}
          className=" absolute bottom-0 h-28   flex justify-center items-center   w-full"
        >
          <div className="h-14  px-5  w-full">
            <div className="w-full bg-darkbg rounded-lg flex items-center justify-evenly h-full">
              <div
                className={`h-10 w-10 rounded-full flex justify-center items-center  cursor-pointer ${
                  isVideoOff ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <IoVideocamOffOutline
                  onClick={() => {
                    setisVideoOff((p) => !p);
                  }}
                  className="text-2xl text-white"
                />
              </div>
              {/* <div
                className={`h-10 w-10 rounded-full flex justify-center items-center  cursor-pointer ${
                  isNotInSpeaker ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <GiSpeakerOff
                  onClick={() => setisNotInSpeaker((p) => !p)}
                  className="text-2xl text-white"
                />
              </div> */}
              <div
                className={`h-10 w-10 rounded-full flex justify-center items-center  cursor-pointer ${
                  isMute ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <AiOutlineAudioMuted
                  onClick={() => {
                    setisMute((p) => !p);
                  }}
                  className="text-2xl text-white"
                />
              </div>

              <div
                onClick={() => {
                  if (isRecevingPage) {
                    handleAcceptCall();
                  }
                }}
                className={`h-10 w-10 rounded-full flex justify-center items-center  cursor-pointer ${
                  isRecevingPage ? "bg-green-500" : "bg-red-500"
                } `}
              >
                <IoIosCall className="text-2xl text-white" />
              </div>
            </div>
          </div>
        </div>
        <motion.div
          drag
          dragConstraints={{
            left: -220,
            top: innderHeight - (innerHeight + 500),
            bottom: 0,
            right: 0,
          }} // Define boundaries
          dragElastic={0.2} // Optional: Adds elasticity to the drag
          style={{ zIndex: 110 }}
          className="h-40 w-28 rounded-lg bg-darkbg_2 active:cursor-move  absolute bottom-3 right-3"
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
        </motion.div>
      </div>
    </div>
  );
};

export default VideoRenderingScreenOnCall;
