import React from "react";

const Button = ({ title, className, Logo, loading }) => {
  return (
    <div
      className={`flex justify-center items-center cursor-pointer bg-darkbg hover:bg-gray-600 text-lg  text-white w-full h-[35px] ${className}  `}
    >
      {loading ? (
        <>loading... </>
      ) : (
        <> {Logo && <Logo className="text-lg " />}</>
      )}
      <p>{title}</p>
    </div>
  );
};

export default Button;
