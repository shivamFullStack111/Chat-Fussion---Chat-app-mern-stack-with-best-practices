import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setCallOponent,
  setCallType,
  setIsCallActive,
  setIsCallSending,
} from "../../store/slices/callSlice";
import ringtine from "../images/ringTone.mp3";
import { useEffect, useRef } from "react";
import { useSocket } from "../SocketProvider";

const Call_Audio = ({ oponentUser }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <FaPhoneAlt className="cursor-pointer hover:text-green-200" />
    </div>
  );
};

export default Call_Audio;
