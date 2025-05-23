/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

const CallComming = () => {
  const { isCallComing, isCallActive, call_oponent, call_type, isCallSending } =
    useSelector((state) => state.call);
  const { user } = useSelector((state) => state.user);
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const [stream, setstream] = useState(null);

  const peerAudioRef = useRef(null);
  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
      ]
    })
  );
  const [offer, setoffer] = useState(null);

  useEffect(() => {
    if (!socket) return;
    peerConnection.current.ontrack = (event) => {
      peerAudioRef.current.srcObject = event.streams[0];
    };

    socket.on("candidate", async (candidate) => {
      console.log("candidate on receiving side", candidate);
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    });

    socket.on("incomingCall", async ({ offer, caller, type }) => {
      console.log(setoffer(offer));
      dispatch(setCallOponent(caller));
      dispatch(setIsCallComing(true));
      dispatch(setCallType(type));
    });

    return () => {
      socket.off("incomingCall");
      socket.off("candidate");
    };
  }, [socket, dispatch]);

  const handleAcceptCall = async () => {
    try {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
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
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", { answer, caller: call_oponent });
      dispatch(setIsCallActive(true));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("call-cut", () => {
      console.log("call cut request");
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
  }, [socket, dispatch, isCallActive, offer]);

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
    // window.location.reload();

    return;
  };

  return (
    <>
      {call_oponent && (
        <div
          style={{ zIndex: 60 }}
          className={`absolute ${
            isCallComing ? "block" : "hidden"
          } top-0 left-0 bg-black-800  w-full h-full flex justify-center items-center`}
        >
          <div className="relative bg-black-900 rounded-lg w-[350px] items-center flex flex-col h-full 350px:h-[95%] ">
            {call_type == "video" ? (
              <VideoRenderingScreenOnCall
                oponentVideoRef={peerAudioRef}
                handleAcceptCall={handleAcceptCall}
                isRecevingPage={true}
              ></VideoRenderingScreenOnCall>
            ) : (
              <audio
                className="hidden"
                ref={peerAudioRef}
                autoPlay
                controls
              ></audio>
            )}
            {/* oponent profile image,oponent name,timer */}

            <OponentDetailsOnCall></OponentDetailsOnCall>
            <div
              onClick={() => {
                if (!isCallActive) handleAcceptCall();
                else handleCutCall();
              }}
              className={`h-12 w-12 flex justify-center items-center rounded-full cursor-pointer text-white hover:scale-105 transition-all duration-200 mb-6 animate-pulse ${
                isCallActive ? "bg-red-500" : "bg-green-500"
              }  mt-auto`}
            >
              <IoIosCall className="text-3xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CallComming;
