import React, { useState, useRef } from "react";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoRecording } from "react-icons/io5";
import axios from "axios";
import { dbUrl, returnToken } from "../utils";
import { useSelector } from "react-redux";

const AudioRecorder = ({ conversation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const { oponentUser } = useSelector((state) => state.chat);
  const [audioURL, setAudioURL] = useState(null);
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const intervalRef = useRef(null); // Use ref for interval

  const handleMessageSend = async (audioBlob) => {
    try {
      const token = returnToken();
      const formdata = new FormData();
      formdata.append("type", "audio");
      formdata.append("receiver", oponentUser);
      formdata.append("conversationid", conversation?._id);
      formdata.append("file", audioBlob);

      const res = await axios.post(`${dbUrl}/create-message`, formdata, {
        headers: { Authorization: token },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const startRecording = async () => {
    try {
      // Access the microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        console.log(audioBlob);
        setAudioURL(URL.createObjectURL(audioBlob));

        // uploading
        handleMessageSend(audioBlob);

        audioChunks.current = []; // Clear chunks
      };

      mediaRecorder.current.start();
      setIsRecording(true);

      // Start the timer
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev.seconds > 59) {
            return {
              minutes: prev.minutes + 1,
              seconds: 0,
            };
          } else {
            return {
              minutes: prev.minutes,
              seconds: prev.seconds + 1,
            };
          }
        });
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);

      // Stop the timer
      clearInterval(intervalRef.current);
      setTimer({ minutes: 0, seconds: 0 });
      intervalRef.current = null; // Clear reference
    }
  };

  return (
    <div className="flex   flex-col items-center">
      <div>
        {isRecording ? (
          <IoRecording
            onClick={stopRecording}
            className="text-3xl p-1 bg-darkbg_2 rounded-md cursor-pointer text-red-400"
          />
        ) : (
          <MdOutlineKeyboardVoice
            onClick={startRecording}
            className="text-3xl p-1 bg-darkbg_2 rounded-md cursor-pointer text-white"
          />
        )}
      </div>
      {isRecording > 0 && (
        <div>
          {timer.minutes}:{timer.seconds}
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
