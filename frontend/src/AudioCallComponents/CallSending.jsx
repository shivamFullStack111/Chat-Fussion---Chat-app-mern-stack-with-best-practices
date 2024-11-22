/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCallOponent,
  setCallType,
  setIsCallActive,
  setIsCallSending,
} from "../../store/slices/callSlice";
import { useSocket } from "../SocketProvider";

const CallSending = () => {
  const { isCallComing, isCallActive, call_oponent, call_type, isCallSending } =
    useSelector((state) => state.call);
  const { user } = useSelector((state) => state.user);
  const { socket } = useSocket();
  const dispatch = useDispatch();

  const peerAudioRef = useRef(null);
  const peerConnection = useRef(new RTCPeerConnection());

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
  }, [socket, dispatch]);

  const handleCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

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
      peerConnection.current.ontrack = (event) => {
        peerAudioRef.current.srcObject = event.streams[0];
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      socket.emit("incomingCall", {
        caller: user,
        receiver: call_oponent,
        offer: offer,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!socket || !peerConnection.current || !isCallSending) return;
    console.log("run");

    handleCall();

    return () => {};
  }, [socket, peerConnection.current, isCallSending]);

  return (
    <div
      style={{ zIndex: 60 }}
      className={`absolute ${
        isCallSending ? "block" : "hidden"
      } top-0 left-0 bg-black-800  w-full h-full flex justify-center items-center`}
    >
      <div className=" bg-black-900 rounded-lg w-[350px] items-center flex flex-col h-[95%] ">
        <audio ref={peerAudioRef} controls></audio>

        <div
          onClick={() => {
            dispatch(setCallOponent(null));
            dispatch(setCallType(""));
            dispatch(setIsCallSending(false));
          }}
          className="h-14 w-14 rounded-full cursor-pointer hover:scale-105 transition-all duration-200 mb-6 animate-pulse bg-red-500 mt-auto"
        ></div>
      </div>
    </div>
  );
};

export default CallSending;
