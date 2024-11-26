import { FaLocationCrosshairs } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { dbUrl, returnToken } from "../../utils";
import axios from "axios";
import { setallMessages } from "../../../store/slices/chatSlice";

function Location() {
  const { oponentUser, conversation, allMessages } = useSelector(
    (state) => state.chat
  );

  const dispatch = useDispatch();

  const handleGetCoords = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const token = returnToken();

      const res = await axios.post(
        `${dbUrl}/send-current-location`,
        {
          conversationid: conversation._id,
          latitude,
          longitude,
          receiver: oponentUser,
        },
        { headers: { Authorization: token } }
      );
      if (res.data.success) {
        dispatch(
          setallMessages([...allMessages, res?.data?.mssg])
        );
      }
      
    });
  };

  return (
    <>
      <div onClick={handleGetCoords} className="flex flex-col items-center">
        <div className="p-2 1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <FaLocationCrosshairs />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Location
        </p>
      </div>
    </>
  );
}

export default Location;
