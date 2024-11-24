import Loader from "../images/Loader.gif";
const Transparent_Loader = ({ className }) => {
  return (
    <div
      style={{ zIndex: 200 }}
      className={`w-full h-screen flex justify-center items-center absolute top-0 left-0 bg-[#0009]  ${className}`}
    >
      <img className="w-32 h-32 " src={Loader} alt={"Loading..."} />
    </div>
  );
};

export default Transparent_Loader;
