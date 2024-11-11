import { useEffect, useState } from "react";

import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import { InputOtp } from "primereact/inputotp";

import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsAutheticated, setUser } from "../../store/slices/userSlice";

const OtpModal = ({ setotpTakingOpen, email }) => {
  const [token, setTokens] = useState(null);
  const dispatch = useDispatch();
  const [isRequesting, setisRequesting] = useState(false);

  useEffect(() => {
    console.log(token);
    const verifyWithOtp = async () => {
      setisRequesting(true);
      try {
        const res = await axios.post("http://localhost:8000/verify-otp", {
          otp: token,
          email: email,
        });
        console.log(res.data);
        if (res.data?.success) {
          dispatch(setIsAutheticated(true));
          dispatch(setUser(res?.data?.user));
          setisRequesting(false);
          setotpTakingOpen(false)
        }
        setisRequesting(false);
      } catch (error) {
        setisRequesting(false);
        console.log(error.message);
      }
    };
    if (token?.length === 4) {
      verifyWithOtp();
      setisRequesting(false);
    }
  }, [token]);

  return (
    <div className="w-full h-full left-0 top-0 bg-[#0003] absolute flex justify-center items-center">
      <div className="px-20 py-16 relative  rounded-xl flex-col text-gray-400 flex items-center gap-2 bg-darkbg_2 ">
        <RxCross1
          onClick={() => setotpTakingOpen(false)}
          className="ml-auto absolute cursor-pointer  right-2 top-2 "
        />
        <p className="font-semibold text-lg ">Enter otp</p>
        <InputOtp
          value={token}
          onChange={(e) => setTokens(e.value)}
          integerOnly
        />
        {isRequesting ? (
          <div className="w-6 h-6 mt-4 border rounded-full border-white border-t-0 animate-spin"></div>
        ) : (
          <p className="text-[12px] ml-auto text-green-400 underline cursor-pointer">
            resend otp
          </p>
        )}
      </div>
    </div>
  );
};

export default OtpModal;
