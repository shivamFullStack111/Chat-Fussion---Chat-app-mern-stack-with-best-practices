/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import brandLogo from "../images/brandLogo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  createConversation,
  getContactsBySearch,
} from "../../helpers/messageFunctions";
import {
  setallMessages,
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
                    if (conversation?.type !== "group") {
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
                    } else {
                      return (
                        <GroupConversationCard
                          conversation={conversation}
                          isGroupCreating={isGroupCreating}
                          selectedUsersForGroup={selectedUsersForGroup}
                          user={user}
                          setselectedUsersForGroup={setselectedUsersForGroup}
                          key={i}
                        />
                      );
                    }
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

const ConversationCard = ({ conversation, user }) => {
  const { activeUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [oponent, setoponent] = useState(null);
  const { allUsers } = useSelector((state) => state.user);


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
        console.log(conversation);
        dispatch(setConversation(conversation));
        dispatch(setallMessages([]));

        dispatch(setIsChatOpen(true));

        dispatch(setOponentUser(oponent));
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

const GroupConversationCard = ({ conversation }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(setIsChatOpen(true));
        dispatch(setConversation(conversation));
        dispatch(setOponentUser(null));
      }}
      className="flex cursor-pointer justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 bg-white rounded-full">
          <img
            className="w-full h-full rounded-full"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
        <div>
          <div className="text-sm leading-tight text-gray-400">
            {conversation?.groupName}
          </div>
        </div>
      </div>
    </div>
  );
};
