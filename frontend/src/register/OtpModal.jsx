import  { useState } from "react";

import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import { InputOtp } from "primereact/inputotp";

import { RxCross1 } from "react-icons/rx";

const OtpModal = ({setotpTakingOpen}) => {
  const [token, setTokens] = useState(null);
  return (
    <div className="w-full h-full left-0 top-0 bg-[#0003] absolute flex justify-center items-center">
      <div className="px-20 py-16 relative  rounded-xl flex-col text-gray-400 flex items-center gap-2 bg-darkbg_2 ">
        <RxCross1 className="ml-auto absolute cursor-pointer  right-2 top-2 " />
        <p className="font-semibold text-lg ">Enter otp</p>
        <InputOtp
          value={token}
          onChange={(e) => setTokens(e.value)}
          integerOnly
        />
        <p className="text-[12px] ml-auto text-green-400 underline cursor-pointer">resend otp</p>
      </div>
    </div>
  );
};

export default OtpModal;
