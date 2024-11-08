/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaRegUser } from "react-icons/fa"; // Fallback logo

export const LogoInput = ({
  title = "Title",
  inputType = "text",
  placeholder,
  styles,
  className,
  Logo = FaRegUser, // Default to FaRegUser if no logo is passed
}) => {
  const [focus, setfocus] = useState(false);

  return (
    <div style={styles ? styles : null} className={`w-full ${className}`}>
      <p className="text-sm mb-1">{title}</p>
      <div
        className={`flex gap-1 border ${
          focus ? "border-gray-700" : "border-gray-400"
        }  py-1 rounded-md items-center px-2 `}
      >
        <Logo
          className={`text-gray-500  ${
            focus ? "text-gray-700" : "text-gray-400"
          }`}
        />{" "}
        {/* Render dynamic logo */}
        <input
          onFocus={() => {
            console.log("Input focused");
            setfocus(true);
          }}
          onBlur={() => {
            console.log("Input blurred");
            setfocus(false);
          }} // Set focus state to false on blur
          className="w-full outline-none rounded-md"
          type={inputType}
          placeholder={placeholder || `Enter your ${title.toLowerCase()}`}
        />
      </div>
    </div>
  );
};
