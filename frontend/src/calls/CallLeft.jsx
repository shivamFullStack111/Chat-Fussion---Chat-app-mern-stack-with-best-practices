/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import brandLogo from "../images/brandLogo.png";
import { GoArrowDown } from "react-icons/go";
import { IoCall } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
const CallLeft = ({ dimensions }) => {
  return (
    <div className="w-full 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
      <div className="p-7 pb-0">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-gray-500">Calls</p>
          <img
            className="w-10 h-10 rounded-full bg-darkbg"
            src={brandLogo}
            alt=""
          />
        </div>
        <div className="flex items-center bg-darkbg p-3 py-1 mt-5 rounded-md">
          <input
            placeholder="Search..."
            spellCheck={false}
            className="outline-none text-sm text-gray-300 w-full p-[5px] bg-darkbg "
            type="text "
          />
          <FaSearch className=" text-gray-400" />
        </div>

        <div
          style={{
            height:
              dimensions?.width > 1000
                ? dimensions?.height - 130
                : dimensions?.height - 180,
          }}
          className=" overflow-y-scroll overflow-x-hidden scroll-smooth"
        >
          <div className="flex flex-col gap-2 mt-4">
            {calls.map((call, i) => (
              <div className=" flex items-center justify-between" key={i}>
                <div className="flex gap-2 items-center">
                  <div
                    className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
                    src=""
                    alt=""
                  >
                    {call?.userName[0]}
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-500 leading-tight">
                      {call?.userName}
                    </p>
                    <div className="text-[12px] flex items-center gap-1 text-gray-600 leading-tight">
                      <GoArrowDown className="text-green-500 rotate-45" />
                      <p>Today 1:00 PM</p>
                    </div>
                  </div>
                </div>

                <p className="text-green-500">{call?.type == "audioCall" ? <IoCall /> : <IoVideocam />}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLeft;

const calls = [
  {
    userName: "Amit",
    type: "audioCall",
    createdAt: "2024-10-01T09:00:00Z",
    userNumber: "+91 9876543210",
  },
  {
    userName: "Priya",
    type: "videoCall",
    createdAt: "2024-10-02T11:30:00Z",
    userNumber: "+91 9876543211",
  },
  {
    userName: "Rajesh",
    type: "audioCall",
    createdAt: "2024-10-03T14:15:00Z",
    userNumber: "+91 9876543212",
  },
  {
    userName: "Sneha",
    type: "videoCall",
    createdAt: "2024-10-04T08:45:00Z",
    userNumber: "+91 9876543213",
  },
  {
    userName: "Vikram",
    type: "audioCall",
    createdAt: "2024-10-05T10:20:00Z",
    userNumber: "+91 9876543214",
  },
  {
    userName: "Anjali",
    type: "videoCall",
    createdAt: "2024-10-06T12:00:00Z",
    userNumber: "+91 9876543215",
  },
  {
    userName: "Ravi",
    type: "audioCall",
    createdAt: "2024-10-07T16:40:00Z",
    userNumber: "+91 9876543216",
  },
  {
    userName: "Meera",
    type: "videoCall",
    createdAt: "2024-10-08T18:25:00Z",
    userNumber: "+91 9876543217",
  },
  {
    userName: "Suresh",
    type: "audioCall",
    createdAt: "2024-10-09T20:30:00Z",
    userNumber: "+91 9876543218",
  },
  {
    userName: "Simran",
    type: "videoCall",
    createdAt: "2024-10-10T22:10:00Z",
    userNumber: "+91 9876543219",
  },
];
