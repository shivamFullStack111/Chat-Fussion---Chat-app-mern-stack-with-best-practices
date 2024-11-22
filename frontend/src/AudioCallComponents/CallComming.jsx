/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCallOponent,
  setCallType,
  setIsCallComing,
  setIsCallSending,
} from "../../store/slices/callSlice";
import { useSocket } from "../SocketProvider";

const CallComming = () => {
  const { isCallComing, isCallActive, call_oponent, call_type, isCallSending } =
    useSelector((state) => state.call);
  const { user } = useSelector((state) => state.user);
  const { socket } = useSocket();
  const dispatch = useDispatch();

  const peerAudioRef = useRef(null);
  const peerConnection = useRef(new RTCPeerConnection());
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

    socket.on("incomingCall", async ({ offer, caller }) => {
      console.log(setoffer(offer));
      dispatch(setCallOponent(caller));
      dispatch(setIsCallComing(true));
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      stream
        .getTracks()
        .forEach((track) => peerConnection.current.addTrack(track, stream));

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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{ zIndex: 60 }}
      className={`absolute ${
        isCallComing ? "block" : "hidden"
      } top-0 left-0 bg-black-800  w-full h-full flex justify-center items-center`}
    >
      <div className=" bg-black-900 rounded-lg w-[350px] items-center flex flex-col h-[95%] ">
        <audio ref={peerAudioRef} controls></audio>

        <div
          onClick={() => {
            handleAcceptCall();
            setTimeout(() => {
              // handleAcceptCall();
            }, 3000);
          }}
          className="h-14 w-14 rounded-full cursor-pointer hover:scale-105 transition-all duration-200 mb-6 animate-pulse bg-green-500 mt-auto"
        ></div>
      </div>
    </div>
  );
};

export default CallComming;
