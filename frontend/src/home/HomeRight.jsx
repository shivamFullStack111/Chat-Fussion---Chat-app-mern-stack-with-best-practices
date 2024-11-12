import brandLogo from "../images/brandLogo.png";

const HomeRight = () => {
  return (
    <div style={{backgroundImage:`url("https://res.cloudinary.com/dosyxpa1r/image/upload/v1731433482/dosyxpa1r/y2olzazosvfnpc95vkz7.webp")`}} className="w-full max-1000px:hidden bg-darkbg flex justify-center items-center ">
      <div className="flex justify-center bg-no-repeat bg-cover flex-col items-center">
        <img
          className="w-20 h-20 rounded-full bg-white animate-bounce"
          src={brandLogo}
          alt=""
        />
        <p className="text-gray-400 font-semibold text-xl tracking-wider">
          Welcome to Fusion Chat App
        </p>
        <p className="text-sm text-gray-500 tracking-wide mt-3  font-semibold">
          You can share you felling and thoughts
        </p>
        <p className="text-sm text-gray-500 tracking-wide  font-semibold">
          or make you business conversations
        </p>
      </div>
    </div>
  );
};

export default HomeRight;
