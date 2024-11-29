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
import { dbUrl, returnToken } from "../utils";
import { Link } from "react-router-dom";
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
      const res = await axios.post(`${dbUrl}/update-user`, data, {
        headers: { Authorization: token },
      });

      if (res.data?.success) {
        toast.success(res.data.message);
        console.log("update", res.data.user);
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
  }, [user]);

  const handleChangeBackgroundImage = async (userimagetype) => {
    try {
      const token = returnToken();

      const formdata = new FormData();
      formdata.append("file", backGroundNewImage);
      formdata.append("imageType", userimagetype);
      const res = await axios.post(`${dbUrl}/update-image`, formdata, {
        headers: { Authorization: token },
      });

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
  const handleChangeProfileImage = async (image) => {
    try {
      const token = returnToken();

      const formdata = new FormData();
      formdata.append("file", image);
      formdata.append("imageType", "profile");
      const res = await axios.post(`${dbUrl}/update-image`, formdata, {
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
                  onClick={() => handleChangeBackgroundImage("background")}
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
                src={
                  user?.profileImage
                    ? user?.profileImage
                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8zMzMvLy8iIiIwMDAfHx8rKyslJSUoKCgbGxseHh78/PwZGRn29vY0NDTKyspaWlpAQEB+fn7h4eHZ2dmZmZnJycnt7e3w8PBkZGRNTU3R0dGzs7M5OTmvr6+goKBHR0eEhIS+vr5vb2+CgoKmpqZdXV2QkJASEhJzc3OamppUVFSsta06AAAGAklEQVR4nO3d23qqOhAA4JojB1EERBFQxCq1vv/7bai6266qBGKT0G/+615kmtMkDPjyAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8UV6YluvN/H2fxdFCd2Oezo32uwJRijnnmFKe+9vyL0UZVjPOGRl9IsjCKCld3S17jti3ra/RXUwIo6z6Ax059cfoZ3jXruS0WupuoZzF0b4f3weeZ7obKSPLrcfxNf1Id4Mdqu4Wt3TgmZVPdTe1H8/HIvHVEF3rbmwfC4ER+r+3ue7mdhfO2EQ8QmIPLsTFionH16B73U3uxk06DNFzL/JSd6M7qUQXmS8hslB3qzsox50DHI3Yajhp6vJWHtoOV7obLizoOgkv7Eh3ywWldr8ARyzR3XRBh44bxScc6267kGn3dfQKDaMTd727cERwqrv1AsL+AdbHjEB38wW8c4kIycj8s6LrC50J76Hmn/jD/utMg5k/TNdyEZLc+NQtkFloamPT8293JTUN603f9InoyQ3Ser8w/bAf9jk3fcV2ukNoMe2bdV+hle4QWpSyo5RMdIfQQnKzqFm6Q2ghHyHXHUKLvx9hJj0Pke4QWpRUNsJCdwgtItn9EB10h9BiKbsfWlvdIbRwZ72uSj9h459fSNzSfLCNv6mRusSocU93BG16XwefDeA+0ZObiHijO4B2rz0fWlwiNP2I/yJ15d0MUuOvaSTvMQZwmVjb90/cyMz4lbTh5b3XmiGsM43eJ6iBdGGt6DcTJ84gZmEj7XfAQL7uhovb9hqnzgD2wiuva0VUYzyo8r1w1HkqYtMPhv+Iu5bUWEPIZr7Juu37lj+8eu+sy4JqnYYV4HLf1G+VjvBcxId6q4/2Q4kyCjB2mmUjEqwSJvZr89cTio8DKPtyY/+t2SmcY71wLHdYYL1hpEllUlT3uDU+xGYvOHV81/cr8KEZc+tJWzcimjQbfXb5XyDbN7lwP9rRz6lnzZpbs0WAH23+hBZNB7qVTa5V4cjZmTpWvYp9C4ZY82bERUeH3xmryJ7tm9NE9P29BcYqI88Y6ezHPSJefVx+hnNmW+SfKAnCb4ePl9fcyvp30eWFgbem87cbewN6252z6WlVMIwthj4wjq1Rsj4XeGXkRhcj417AWCR3UhhmB5dZtYj3r4m/Wq1Oh2OVRedxuFwX9PYQdhKjKtyi4v6SyehhfbuxXrrN6d2swCqMWXDcl5g8zF4QRskm/Z6wuGG5XdGH6TkaGbNvlLwtPSOM8/x0nGdlPJ3G5b5KCoR/rC8/QuSGFEXHjtBBiTQLzBm3kNjZyjGiF9N7u90zmFAVHU4kS/UeQrn2u5tlnxsZcRN20p3eBJIPRFtxzUXDmWxhQjtb6zXxYvyLq8wFGetMbpJfnYQXOitOpQugxFBtb5d6sjXdgtBJ182GdJWeKF3V7aq6sKmM1tOJpaMowHrH0DIT3URVF+oq0YjUdWG9nOpIT+e/na99xXVc28iWWXZCZuoDlC4G7mas/tJmo3KQ1sNUfWGt3Kuinakv/3ZV5TNXWPV+oXSvaDiqJ6KynPRKeW66laqT7cFS/eGTg9qFRkMBeKFyv2+ofltIooa0b4S52mvFheoAR4SovZAKVS80o5HiD2VF95/7/RbVmWlaqM1LEVVeveBtVXYjn+l4lDgtVOU1yNnqKXnzqgcf0H0eggt9D0rDk3j9YV8W1fsSRlmIFOf1x3igu+rE2+S/95gb4cSAx9wviwr9TozIPhhSjPER49PjY7Zv0jfblxv21O2RsPHBiEqTL9xshft91PNneAizQHsNxi1pkD8slxWMz+Knve71865FljCxr5TfDc+ZVSYsnw+E+wRT1mu4IsuebeMhvJKwyI5szAVL184mhOFxUaW6y4PEeenGxw5mImESxKmdB5mxc+8uN1oHq9zCnKGbgRKEkIUxmiXzIf8iyzIqN0FymhFOHYqbn5lpfmkGU4pZXvi7KktDg7b1/txlGKZxud5v3t/fN/t1Vk6jcDGcSQcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiPsPW3BdUudCjfcAAAAASUVORK5CYII='
                }
                alt=""
              />
              <div>
                <input
                  onChange={(e) => handleChangeProfileImage(e.target.files[0])}
                  type="file"
                  name=""
                  className="hidden"
                  id="profile-image"
                />
                <label htmlFor="profile-image">
                  <IoIosCamera className="absolute bg-white text-gray-700 p-1 text-3xl rounded-full right-0 bottom-0" />
                </label>
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
            <p
              className={`h-3 w-3 rounded-full ${
                data?.status == "active" ? "bg-green-400" : "bg-red-400"
              }`}
            ></p>
            <p className="text-[13px] text-gray-400 ">{data?.status}</p>
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
                className="w-[60%] bg-black-700 flex-col rounded-sm grid grid-rows-2 py-2  items-center "
              >
                <div
                  onClick={() => {
                    setdata((p) => ({ ...p, status: "active" }));
                    setstatusOpen(false);
                  }}
                  className="flex items-center gap-1 hover:bg-black-800 px-3 cursor-pointer w-full "
                >
                  <p className="h-2 w-2 rounded-full bg-green-400"></p>
                  <p className="text-[13px] text-gray-400 ">Active</p>
                </div>
                {/* <div onClick={()=>setdata(p=>({...p,status:'active'}))} className="flex items-center gap-1 hover:bg-black-800 px-3 cursor-pointer w-full ">
                  <p className="h-2 w-2 rounded-full bg-yellow-400"></p>
                  <p className="text-[13px] text-gray-400 ">Offline</p>
                </div> */}
                <div
                  onClick={() => {
                    setdata((p) => ({ ...p, status: "do not disturb" }));
                    setstatusOpen(false);
                  }}
                  className="flex items-center gap-1 hover:bg-black-800 px-3 cursor-pointer w-full "
                >
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
                      value={user?.email}
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
                    checked={data?.lastSeen}
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
                    checked={data?.showNotifications}
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
                <Link to={"/faq"} className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">FAQs</p>
                </Link>
                <div className="flex justify-center">
                  {" "}
                  <p className="h-[1px] w-[95%] bg-darkbg "></p>
                </div>{" "}
                <Link to={"/help"} className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">Contact</p>
                </Link>
                <div className="flex justify-center">
                  {" "}
                  <p className="h-[1px] w-[95%] bg-darkbg "></p>
                </div>{" "}
                <Link to={"/t&p"} className="flex p-3 justify-between">
                  <p className="text-[13px] text-gray-300 ">
                    Terms & Privacy Policy
                  </p>
                </Link>
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
