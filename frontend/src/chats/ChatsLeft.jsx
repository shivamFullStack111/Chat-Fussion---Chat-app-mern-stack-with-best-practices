/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import brandLogo from "../images/brandLogo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  createConversation,
  getContactsBySearch,
} from "../../helpers/messageFunctions";
import {
  setConversation,
  setIsChatOpen,
  setOponentUser,
} from "../../store/slices/chatSlice";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { toast, Toaster } from "react-hot-toast";
import { BiSolidMessageAdd } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { dbUrl, returnToken } from "../utils";

const ChatLeft = ({ dimensions }) => {
  const { allUsers, user } = useSelector((state) => state.user);
  const [isGroupCreating, setisGroupCreating] = useState(false);
  const [selectedUsersForGroup, setselectedUsersForGroup] = useState([]);
  const [groupName, setgroupName] = useState("");
  const [allConversation, setallConversation] = useState([]);

  const [creatingConversation, setcreatingConversation] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllConversation = async () => {
      const token = returnToken();
      const res = await axios.get(`${dbUrl}/get-all-conversations`, {
        headers: { Authorization: token },
      });
      if (res.data.success) setallConversation(res?.data?.conversations);
    };
    if (user) getAllConversation();
  }, [user]);

  let type = "group";

  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full relative 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
        {!creatingConversation && (
          <>
            <div className="p-7 pb-0">
              {selectedUsersForGroup.length == 0 && (
                <>
                  {" "}
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold text-gray-500">
                      Chats
                    </p>
                    <img
                      className="w-10 h-10 rounded-full bg-darkbg"
                      src={brandLogo}
                      alt=""
                    />
                  </div>
                  <div className="flex gap-2 w-full h-full items-center mt-5">
                    <div className="flex items-center d-full w-full bg-darkbg p-3 py-1  rounded-md">
                      <input
                        placeholder="Search..."
                        spellCheck={false}
                        className="outline-none text-sm  text-gray-300 w-full p-[5px] bg-darkbg "
                        type="text "
                      />
                      <FaSearch className=" text-gray-400" />
                    </div>
                  </div>
                </>
              )}

              <div
                style={{
                  height:
                    dimensions?.width > 1000
                      ? dimensions?.height - 130
                      : dimensions?.height - 180,
                }}
                className=" overflow-y-scroll"
              >
                {/* <p className="mt-6 text-[13px] text-gray-400">FAVOURITES</p> */}

                <div className="flex flex-col gap-2 mt-4">
                  {allConversation?.map((conversation, i) => {
                    return (
                      <ConversationCard
                        selectedUsersForGroup={selectedUsersForGroup}
                        setselectedUsersForGroup={setselectedUsersForGroup}
                        isGroupCreating={isGroupCreating}
                        setisGroupCreating={setisGroupCreating}
                        key={i}
                        dispatch={dispatch}
                        conversation={conversation}
                        user={user}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              onClick={() => setcreatingConversation(true)}
              className="absolute bottom-16 1000px:bottom-4 right-4 w-8 h-8 flex justify-center items-center cursor-pointer bg-primary text-white rounded-md z-50"
            >
              <BiSolidMessageAdd />
            </div>
          </>
        )}

        {creatingConversation && (
          <div className="p-7 pb-0">
            <>
              {" "}
              <div className="flex gap-3 items-center">
                <FaArrowLeft
                  onClick={() => setcreatingConversation(false)}
                  className="text-gray-500  cursor-pointer text-lg"
                />
                <p className="text-2xl font-semibold text-gray-500">Add</p>
              </div>
              {selectedUsersForGroup.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: selectedUsersForGroup.length ? 1 : 0,
                    height: selectedUsersForGroup.length ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-52 overflow-hidden  mt-4 flex flex-col gap-2 shadow-2xl bg-darkbg p-3 rounded-lg"
                >
                  <div className="flex items-center  d-full w-full     p-2 py-1  rounded-md">
                    <input
                      onChange={(e) => setgroupName(e.target.value)}
                      value={groupName}
                      placeholder="Group name"
                      spellCheck={false}
                      className="outline-none text-sm  text-gray-300 bg-black-700 rounded-lg py-2 w-full p-[5px]  "
                      type="text "
                    />
                    <RxCross2
                      onClick={() => {
                        setselectedUsersForGroup([]);
                        setisGroupCreating(false);
                      }}
                      size={25}
                      className=" h-full cursor-pointer text-gray-400"
                    />
                  </div>
                  <div className="flex text-sm  px-2 text-gray-400 items-center gap-5 ">
                    <p className="">Total contacts </p>
                    <p className="bg-blue-500 text-white w-5 h-5 flex justify-center items-center rounded-full">
                      {selectedUsersForGroup?.length}
                    </p>
                  </div>
                  <Button
                    onClick={async () => {
                      if (!groupName) {
                        return toast.error("Please enter a group name");
                      }
                      const res = await createConversation(
                        selectedUsersForGroup,
                        type,
                        groupName
                      );
                      if (res.data.success) {
                        toast.success("Group created successfully");
                        setselectedUsersForGroup([]);
                        setisGroupCreating(false);
                      }
                    }}
                    className={
                      "bg-primary text-white text-sm rounded-md hover:bg-pink-400 "
                    }
                    title={"Create Group"}
                  ></Button>
                </motion.div>
              )}
              {selectedUsersForGroup.length == 0 && (
                <div className="flex gap-2 w-full h-full items-center mt-5">
                  <div className="flex items-center d-full w-full bg-darkbg p-3 py-1  rounded-md">
                    <input
                      placeholder="Search..."
                      spellCheck={false}
                      className="outline-none text-sm  text-gray-300 w-full p-[5px] bg-darkbg "
                      type="text "
                    />
                    <FaSearch className=" text-gray-400" />
                  </div>
                  {isGroupCreating ? (
                    <RxCross2
                      onClick={() => setisGroupCreating(false)}
                      size={25}
                      className=" h-full ml-auto cursor-pointer text-gray-400"
                    />
                  ) : (
                    <AiOutlineUsergroupAdd
                      onClick={() => setisGroupCreating((p) => true)}
                      size={25}
                      className=" h-full ml-auto cursor-pointer text-gray-400"
                    />
                  )}
                </div>
              )}
            </>

            <div
              style={{
                height:
                  dimensions?.width > 1000
                    ? dimensions?.height - 130
                    : dimensions?.height - 180,
              }}
              className=" overflow-y-scroll"
            >
              <div className="flex flex-col gap-2 mt-4">
                {allUsers?.map((userr, i) => {
                  if (userr?.email !== user?.email)
                    return (
                      <UserCard
                        selectedUsersForGroup={selectedUsersForGroup}
                        setselectedUsersForGroup={setselectedUsersForGroup}
                        isGroupCreating={isGroupCreating}
                        setisGroupCreating={setisGroupCreating}
                        key={i}
                        dispatch={dispatch}
                        userr={userr}
                        user={user}
                      />
                    );
                })}
              </div>
              <div className="flex flex-col gap-2 mt-4"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatLeft;

const UserCard = ({
  userr,
  user,
  dispatch,
  isGroupCreating,
  selectedUsersForGroup,
  setselectedUsersForGroup,
}) => {
  const { activeUsers } = useSelector((state) => state.user);

  return (
    <div className=" cursor-pointer flex items-center  gap-2">
      {/* profileImage */}
      {userr?.profileImage ? (
        <>
          {" "}
          <div
            className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
            src=""
            alt=""
          >
            <img
              className="w-full h-full rounded-full object-cover"
              src={userr?.profileImage}
              alt=""
            />
          </div>
        </>
      ) : (
        <>
          {" "}
          <div
            className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
            src=""
            alt=""
          >
            {userr?.name[0]}
            {activeUsers?.includes(userr?.email) && (
              <p className="absolute h-3 w-3 bg-green-400 rounded-full -bottom-1 right-1"></p>
            )}
          </div>
        </>
      )}
      <p className="text-gray-500 text-[12px]">{userr?.name}</p>
      {isGroupCreating && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (selectedUsersForGroup.find((usr) => usr.email == userr.email)) {
              const filterUsers = selectedUsersForGroup.filter(
                (p) => p.email !== userr.email
              );
              setselectedUsersForGroup(filterUsers);
            } else {
              setselectedUsersForGroup((p) => [
                ...p,
                { email: userr?.email, _id: userr?._id },
              ]);
            }
          }}
          className="ml-auto h-full w-[40px] flex justify-center items-center "
        >
          {selectedUsersForGroup.find((usr) => usr.email == userr.email) ? (
            <RxCrossCircled className={` text-lg text-red-500 `} />
          ) : (
            <IoIosAddCircle className={`text-gray-500 text-lg `} />
          )}
        </div>
      )}
    </div>
  );
};

const ConversationCard = ({
  conversation,
  user,

  isGroupCreating,
  selectedUsersForGroup,
  setselectedUsersForGroup,
}) => {
  const { activeUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [oponent, setoponent] = useState(null);
  const { allUsers } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(activeUsers);
  }, [activeUsers]);

  useEffect(() => {
    const userForSearch = conversation.users.find(
      (usrrr) => usrrr.email !== user?.email
    );
    const opnt = allUsers.find((usr) => usr.email == userForSearch.email);
    setoponent(opnt);
  }, [conversation]);

  return (
    <div
      onClick={() => {
        dispatch(setIsChatOpen(true));

        dispatch(setOponentUser(oponent));
        dispatch(setConversation(conversation));
      }}
      className="flex cursor-pointer justify-between items-center "
    >
      <div className="flex gap-2 items-center">
        <div className="h-9  w-9 bg-white rounded-full">
          {oponent?.profileImage ? (
            <img
              src={oponent?.profileImage}
              className="h-full w-full rounded-full"
              alt=""
            />
          ) : (
            <div
              className="h-9 w-9  rounded-full relative bg-primary flex justify-center items-center"
              src=""
              alt=""
            >
              {oponent?.name[0]}
              {activeUsers?.includes(oponent?.email) && (
                <p className="absolute h-3 w-3 bg-green-400 rounded-full -bottom-1 right-1"></p>
              )}
            </div>
          )}
        </div>
        <div>
          <div className="text-sm leading-tight text-gray-400">
            {oponent?.name}
          </div>
          <div className="text-sm text-[12px] leading-tight text-gray-500">
            byee
          </div>
        </div>
      </div>
    </div>
  );
};
