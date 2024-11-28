import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OponentDetailsOnCall = () => {
  const { isCallActive, call_oponent } = useSelector((state) => state.call);
  return (
    <div>
      {" "}
      <div className="flex mt-14 flex-col items-center text-gray-200">
        {/* image  */}
        <div className="h-16 w-16 rounded-full border-2 flex justify-center items-center bg-pink-500 text-xl  ">
          {!call_oponent?.profileImage && call_oponent?.name[0]}
          {call_oponent?.profileImage && (
            <img
              className="w-full h-full rounded-full"
              src={call_oponent?.profileImage}
            ></img>
          )}
        </div>
        {/* name  */}
        <p className="">{call_oponent?.name}</p>
        <CallSpendTimer isCallActive={isCallActive} />
      </div>
    </div>
  );
};

export default OponentDetailsOnCall;

function CallSpendTimer({ isCallActive }) {
  const [countDown, setcountDown] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let interval;

    if (isCallActive) {
      interval = setInterval(() => {
        setcountDown((prev) => {
          const newSeconds = prev.seconds + 1;
          const newMinutes =
            newSeconds === 60 ? prev.minutes + 1 : prev.minutes;

          return {
            minutes: newMinutes,
            seconds: newSeconds % 60,
          };
        });
      }, 1000);
    } else {
      setcountDown({ minutes: 0, seconds: 0 });
    }

    return () => {
      clearInterval(interval); // Cleanup the interval when isCallActive changes or the component unmounts
    };
  }, [isCallActive]);

  return (
    <div>
      {String(countDown.minutes).padStart(2, "0")}:
      {String(countDown.seconds).padStart(2, "0")}
    </div>
  );
}
