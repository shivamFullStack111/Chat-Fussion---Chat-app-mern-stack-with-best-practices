/* eslint-disable react/prop-types */
import { MdModeEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import { IoIosCamera } from "react-icons/io";
import { FaAngleDown, FaHandsHelping, FaLock, FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiEyeCloseFill, RiPencilFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { setUser } from "../../store/slices/userSlice";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import axios from "axios";
import { returnToken } from "../utils";
const HomeLeft = ({
  setstatusOpen,
  statusOpen,
  active,
  setactive,
  dimensions,
}) => {
  const [data, setdata] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [isEditing, setisEditing] = useState(false);
  const dispatch = useDispatch();
  const [backGroundNewImage, setbackGroundNewImage] = useState("");

  const handleUpdateUser = async () => {
    try {
      const token = returnToken();
      if (!token) toast.error("Login to continue");
      const res = await axios.post("http://localhost:8000/update-user", data, {
        headers: { Authorization: token },
      });

      if (res.data?.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      setdata(user);
    }
  }, []);

  const handleChangeImage = async (userimagetype) => {
    try {
      const token = returnToken();

      const formdata = new FormData();
      formdata.append("file", backGroundNewImage);
      formdata.append("imageType", userimagetype);
      const res = await axios.post(
        "http://localhost:8000/update-image",
        formdata,
        { headers: { Authorization: token } }
      );

      if (res.data?.success) {
        toast.success(res.data.message);
        setbackGroundNewImage(null);
        dispatch(setUser(res.data.user));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
        <div className=" w-full h-[150px] bg-gray-600 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0001] flex justify-between p-3">
            <p className="text-white  font-semibold tracking-wide">Settings</p>
            <input
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setbackGroundNewImage(e.target.files[0]);
              }}
              className="hidden"
              id="backImage"
            />
            {!backGroundNewImage ? (
              <label htmlFor="backImage">
                <MdModeEdit className="text-black cursor-pointer bg-white p-2 text-3xl rounded-full" />
              </label>
            ) : (
              <div className="flex gap-2 items-start">
                <TiTick
                  onClick={() => handleChangeImage("background")}
                  className="text-green-500 cursor-pointer bg-white p-2 text-3xl rounded-full"
                />

                <RxCross1
                  onClick={() => setbackGroundNewImage(null)}
                  className="text-red-500 cursor-pointer bg-white p-2 text-3xl rounded-full"
                />
              </div>
            )}
          </div>
          {/* background image  */}
          {backGroundNewImage ? (
            <img
              className="object-cover bg-no-repeat w-full h-full"
              src={URL.createObjectURL(backGroundNewImage)}
              alt=""
            />
          ) : (
            <img
              className="object-cover bg-no-repeat w-full h-full"
              src={
                user?.backgroundImage
                  ? user?.backgroundImage
                  : "https://cdn.pixabay.com/animation/2023/03/19/02/34/02-34-11-741_512.gif"
              }
              alt=""
            />
          )}

          <div className="flex justify-center">
            {/* profile image  */}
            <div className="h-20 w-20 bg-white rounded-full absolute -bottom-10  ">
              <img
                className="w-full h-full border-4 border-white rounded-full"
                src="https://dootnode.themesbrand.website/assets/images/users/62188.png"
                alt=""
              />
              <div>
                <IoIosCamera className="absolute bg-white text-gray-700 p-1 text-3xl rounded-full right-0 bottom-0" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative   ">
          {/* status   */}
          <div
            onClick={() => setstatusOpen((p) => !p)}
            className="text-white flex justify-center cursor-pointer items-center gap-1 mt-[50px] "
          >
            <p className="h-3 w-3 rounded-full bg-green-400"></p>
            <p className="text-[13px] text-gray-400 ">Active</p>
            <FaAngleDown className="text-gray-400" />
          </div>
          {/* status change box  */}
          {statusOpen && (
            <div className="flex absolute w-full justify-end mt-2  px-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: statusOpen ? 0 : 20,
                  opacity: statusOpen ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="w-[60%] bg-black-700 flex-col rounded-sm grid grid-rows-3 h-[80px]  items-center "
              >
                <div className="flex items-center gap-1 hover:bg-black-800 px-3 cursor-pointer w-full ">
                  <p className="h-2 w-2 rounded-full bg-green-400"></p>
                  <p className="text-[13px] text-gray-400 ">Active</p>
                </div>
                <div className="flex items-center gap-1 hover:bg-black-800 px-3 cursor-pointer w-full ">
                  <p className="h-2 w-2 rounded-full bg-yellow-400"></p>
                  <p className="text-[13px] text-gray-400 ">Offline</p>
                </div>
                <div className="flex items-center gap-1 hover:bg-black-800 px-3 cursor-pointer w-full ">
                  <p className="h-2 w-2 rounded-full bg-red-400"></p>
                  <p className="text-[13px] text-gray-400 ">Do not disturb</p>
                </div>
              </motion.div>
            </div>
          )}

          {/* all about  */}
          <div
            style={{ height: dimensions.height - 300 }}
            className="w-full   overflow-y-scroll hide-scrollbar   mt-6"
          >
            {/* box 1  */}
            <div className="  border-y-2  border-black-700   w-full ">
              <div
                onClick={() => setactive((p) => (p == 1 ? 0 : 1))}
                className={`cursor-pointer py-3 ${
                  active == 1 && "bg-darkbg"
                } px-3 flex justify-between w-full `}
              >
                <div className="text-sm flex gap-2 items-center text-gray-500">
                  <FaUserAlt />
                  <div>Personal info</div>
                </div>
                <FaAngleDown
                  className={`text-gray-400 transition-all duration-300  ${
                    active == 1 && "rotate-180"
                  } `}
                />
              </div>
              <motion.div
                className={"overflow-hidden"}
                initial={{ height: 0 }}
                animate={{ height: active == 1 ? "auto" : 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex p-3 justify-between">
                  <div className="">
                    <p className="text-[13px] text-gray-400 font-light">Name</p>
                    <input
                      disabled={!isEditing}
                      onChange={(e) =>
                        setdata((p) => ({ ...p, name: e.target.value }))
                      }
                      className={`bg-transparent outline-none ${
                        isEditing && "border-b-2"
                      }  border-gray-600 w-full text-sm text-gray-300`}
                      value={data?.name}
                      type="text"
                      name=""
                      id=""
                    />
                  </div>

                  {isEditing ? (
                    <RxCross1
                      onClick={() => setisEditing((p) => false)}
                      className="bg-[#32fd6527] rounded-sm cursor-pointer p-2 text-3xl text-green-400"
                    />
                  ) : (
                    <RiPencilFill
                      onClick={() => setisEditing((p) => true)}
                      className="bg-[#32fd6527] rounded-sm cursor-pointer p-2 text-3xl text-green-400"
                    />
                  )}
                </div>
                <div className="flex p-3  justify-between">
                  <div className="">
                    <p className="text-[13px] text-gray-400 font-light">
                      Email
                    </p>
                    <input
                      disabled
                      className="bg-transparent text-sm text-gray-300"
                      value={"shivam@gmail.com"}
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* box 2 personal privacy  */}
            <div className="   border-b-2  border-black-700   w-full ">
              <div
                onClick={() => setactive((p) => (p == 2 ? 0 : 2))}
                className={`cursor-pointer py-3 ${
                  active == 2 && "bg-darkbg"
                } px-3 flex justify-between w-full `}
              >
                <div className="text-sm flex gap-2 items-center text-gray-500">
                  <RiEyeCloseFill />
                  <div>Privacy</div>
                </div>
                <FaAngleDown
                  className={`text-gray-400 transition-all duration-300  ${
                    active == 2 && "rotate-180"
                  } `}
                />
              </div>
              <motion.div
                className={"overflow-hidden"}
                initial={{ height: 0 }}
                animate={{ height: active == 2 ? "auto" : 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">Profile picture</p>

                  <select
                    value={data?.profilePicture}
                    onChange={(e) =>
                      setdata((p) => ({ ...p, profilePicture: e.target.value }))
                    }
                    className="bg-darkbg text-[13px] cursor-pointer px-2 text-gray-300 rounded-md py-1  outline-none"
                  >
                    <option value="friends">Friends</option>
                    <option value="nobody">Nobody</option>
                    <option value="everyone">Everyone</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  {" "}
                  <p className="h-[1px] w-[95%] bg-darkbg "></p>
                </div>
                <div className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">Last seen</p>

                  <input
                    onChange={(e) =>
                      setdata((p) => ({ ...p, lastSeen: e.target.checked }))
                    }
                    value={data?.lastSeen}
                    className="w-4"
                    type="checkbox"
                  />
                </div>
              </motion.div>
            </div>
            {/* box 3 personal security  */}
            <div className="   border-b-2  border-black-700   w-full ">
              <div
                onClick={() => setactive((p) => (p == 3 ? 0 : 3))}
                className={`cursor-pointer py-3 ${
                  active == 3 && "bg-darkbg"
                } px-3 flex justify-between w-full `}
              >
                <div className="text-sm flex gap-3 items-center text-gray-500">
                  <FaLock />
                  <div>Security</div>
                </div>
                <FaAngleDown
                  className={`text-gray-400 transition-all duration-300  ${
                    active == 3 && "rotate-180"
                  } `}
                />
              </div>
              <motion.div
                className={"overflow-hidden"}
                initial={{ height: 0 }}
                animate={{ height: active == 3 ? "auto" : 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">
                    Show notification
                  </p>

                  <input
                    value={data?.showNotifications}
                    onChange={(e) =>
                      setdata((p) => ({
                        ...p,
                        showNotifications: e.target.checked,
                      }))
                    }
                    className="w-4"
                    type="checkbox"
                  />
                </div>
                <div className="flex justify-center">
                  {" "}
                  <p className="h-[1px] w-[95%] bg-darkbg "></p>
                </div>{" "}
                <div className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">
                    Notification Sound
                  </p>
                  <input
                    value={data?.notificationSound}
                    onChange={(e) =>
                      setdata((p) => ({
                        ...p,
                        notificationSound: e.target.checked,
                      }))
                    }
                    className="w-4"
                    type="checkbox"
                  />{" "}
                </div>
              </motion.div>
            </div>
            {/* box 4 personal help  */}
            <div className="   border-b-2  border-black-700   w-full ">
              <div
                onClick={() => setactive((p) => (p == 4 ? 0 : 4))}
                className={`cursor-pointer py-3 ${
                  active == 4 && "bg-darkbg"
                } px-3 flex justify-between w-full `}
              >
                <div className="text-sm flex gap-3 items-center text-gray-500">
                  <FaHandsHelping />
                  <div>Help</div>
                </div>
                <FaAngleDown
                  className={`text-gray-400 transition-all duration-300  ${
                    active == 4 && "rotate-180"
                  } `}
                />
              </div>
              <motion.div
                className={"overflow-hidden"}
                initial={{ height: 0 }}
                animate={{ height: active == 4 ? "auto" : 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">FAQs</p>
                </div>
                <div className="flex justify-center">
                  {" "}
                  <p className="h-[1px] w-[95%] bg-darkbg "></p>
                </div>{" "}
                <div className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">Contact</p>
                </div>
                <div className="flex justify-center">
                  {" "}
                  <p className="h-[1px] w-[95%] bg-darkbg "></p>
                </div>{" "}
                <div className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">
                    Terms & Privacy Policy
                  </p>
                </div>
              </motion.div>
            </div>
            {user !== data && (
              <div className="p-3 ">
                <Button
                  onClick={handleUpdateUser}
                  className={"bg-primary text-sm rounded-md"}
                  title={"Update"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLeft;
