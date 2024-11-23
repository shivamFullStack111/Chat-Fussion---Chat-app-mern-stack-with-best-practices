/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const DateDivider = ({ date }) => {
  return (
    <div className="flex items-center gap-2 text-white justify-center">
      <p className="h-[2px] bg-gray-400 w-[35%] "></p>
      <p className="text-sm bg-black px-2 py-1 rounded-md">{date}</p>
      <p className="h-[2px] bg-gray-400 w-[35%] "></p>
    </div>
  );
};

export default DateDivider;
