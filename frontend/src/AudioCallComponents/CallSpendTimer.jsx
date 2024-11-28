import React, { useEffect, useState } from "react";

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
          const newMinutes = newSeconds === 60 ? prev.minutes + 1 : prev.minutes;

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

export default CallSpendTimer;
