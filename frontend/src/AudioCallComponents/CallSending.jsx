/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCallerUser,
  setCallOponent,
  setCallType,
  setIsCallActive,
  setIsCallComing,
  setIsCallSending,
} from "../../store/slices/callSlice";
import { useSocket } from "../SocketProvider";
import VideoRenderingScreenOnCall from "./VideoRenderingScreenOnCall";
import { IoIosCall } from "react-icons/io";
import OponentDetailsOnCall from "./OponentDetailsOnCall";
import axios from "axios";
import { dbUrl, returnToken } from "../utils";

const CallSending = () => {
  const {
    isCallComing,
    isCallActive,
    call_oponent,
    call_type,
    isCallSending,
    caller_user,
  } = useSelector((state) => state.call);
  const { conversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const [isMute, setisMute] = useState(false);
  const [isVideoOff, setisVideoOff] = useState(false);

  const [stream, setstream] = useState();

  const peerAudioRef = useRef(null);
  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
      ],
    })
  );

  // iske dependecy me isCallActive nhi diya tha iss liye call shi se nhi chl rhi thi

  useEffect(() => {
    if (!socket) return;
    socket.on("candidate", async (candidate) => {
      console.log("candidate on sender side", candidate);
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    });
    peerConnection.current.ontrack = (event) => {
      peerAudioRef.current.srcObject = event.streams[0];
    };

    socket.on("answer", async (answer) => {
      console.log("answer", answer);

      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );

      dispatch(setIsCallActive(true));
    });

    return () => {
      socket.off("candidate");
      socket.off("answer");
    };
  }, [socket, dispatch, isCallActive]);

  const handleCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: call_type === "video" ? true : false,
      });

      stream
        .getTracks()
        .forEach((track) => peerConnection.current.addTrack(track, stream));

      setstream(stream);

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", {
            candidate: event.candidate,
            toUser: call_oponent,
          });
        }
      };
      peerConnection.current.ontrack = (event) => {
        peerAudioRef.current.srcObject = event.streams[0];
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      socket.emit("incomingCall", {
        caller: user,
        receiver: call_oponent,
        offer: offer,
        type: call_type,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // aur iske bhi dependecy me isCallActive nhi diya tha iss liye call shi se nhi chl rhi thi

  useEffect(() => {
    if (!socket || !peerConnection.current || !isCallSending) return;
    console.log("run");

    handleCall();

    return () => {};
  }, [socket, isCallSending, isCallActive]);

  useEffect(() => {
    if (!socket) return;
    socket.on("call-cut", () => {
      console.log("call ended");
      dispatch(setIsCallActive(false));
      dispatch(setIsCallSending(false));
      dispatch(setCallOponent(null));
      dispatch(setCallType(null));
      dispatch(setIsCallComing(false));

      // window.location.reload();
    });

    return () => {
      socket.off("call-cut");
    };
  }, [socket, dispatch, isCallActive]);

  // const handleCutCall = () => {
  //   dispatch(setIsCallActive(false));
  //   dispatch(setIsCallSending(false));
  //   dispatch(setCallType(null));
  //   dispatch(setIsCallComing(false));

  //   const token = returnToken();
  //   axios.post(
  //     `${dbUrl}/create-call`,
  //     {
  //       sender: caller_user ? caller_user : call_oponent?.email,
  //       receiver:
  //         caller_user == user?.email ? call_oponent?.email : user?.email,
  //       type: "call",
  //       callType: "audio",
  //       conversationid: conversation?._id,
  //     },
  //     { headers: { Authorization: token } }
  //   );

  //   dispatch(setCallOponent(null));
  //   dispatch(setCallerUser(null));

  //   // window.location.reload();

  //   return;
  // };

  const handleCutCall = () => {
    dispatch(setIsCallActive(false));
    dispatch(setIsCallSending(false));
    dispatch(setCallOponent(null));
    dispatch(setCallType(null));
    dispatch(setIsCallComing(false));

    // emit cut call event

    socket.emit("call-cut", { to: call_oponent?.email });

    stream?.getTracks().forEach((track) => track.stop());
    setstream(null);
    return;
  };

  return (
    <>
      {call_oponent && (
        <div
          style={{ zIndex: 60 }}
          className={`absolute ${
            isCallSending ? "block" : "hidden"
          } top-0 left-0 bg-black-800  w-full h-full flex justify-center items-center`}
        >
          <div className=" bg-black-900 relative  rounded-lg w-[350px] items-center flex flex-col h-full 350px:h-[95%] ">
            {call_type == "video" ? (
              <VideoRenderingScreenOnCall
                stream={stream}
                peerConnection={peerConnection}
                dispatch={dispatch}
                oponentVideoRef={peerAudioRef}
              ></VideoRenderingScreenOnCall>
            ) : (
              <audio
                ref={peerAudioRef}
                controls
                autoPlay
                className="hidden"
              ></audio>
            )}

            <OponentDetailsOnCall />

            <div
              onClick={() => {
                handleCutCall();
              }}
              className="h-12 w-12 rounded-full text-white flex justify-center items-center cursor-pointer hover:scale-105 transition-all duration-200 mb-6 animate-pulse bg-red-500 mt-auto"
            >
              {" "}
              <IoIosCall className="text-3xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CallSending;
