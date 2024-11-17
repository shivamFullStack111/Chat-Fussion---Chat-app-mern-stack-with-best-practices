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

const ChatLeft = ({ dimensions }) => {
  const { allUsers, user } = useSelector((state) => state.user);
  const [allContacts, setallContacts] = useState([]);
  const [isGroupCreating, setisGroupCreating] = useState(false);
  const [selectedUsersForGroup, setselectedUsersForGroup] = useState([]);
  const [groupName, setgroupName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getContact = async () => {
      const res = await getContactsBySearch();
      console.log("res;----", res.data);
      setallContacts(res.data?.contacts);
    };
    if (user) getContact();
  }, [user]);

  let type = "group";

  return (
    <>
      <Toaster position="top-right" />
      <div className="w-full relative 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
        <div className="p-7 pb-0">
          {selectedUsersForGroup.length == 0 && (
            <>
              {" "}
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold text-gray-500">Chats</p>
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
                {isGroupCreating ? (
                  <RxCross2
                    onClick={() => setisGroupCreating(false)}
                    size={25}
                    className=" h-full cursor-pointer text-gray-400"
                  />
                ) : (
                  <AiOutlineUsergroupAdd
                    onClick={() => setisGroupCreating((p) => true)}
                    size={25}
                    className=" h-full cursor-pointer text-gray-400"
                  />
                )}
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
            <div className="flex flex-col gap-2 mt-4">
              {allContacts?.map((userr, i) => {
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
            {/* <p className="mt-8 text-[13px] text-gray-400">FAVOURITES</p> */}
            <div className="flex flex-col gap-2 mt-4">
              {/* {["ram", "Karan", "priya", "Sham"].map((user, i) => (
              <div className=" flex items-center  gap-2" key={i}>
                <div
                  className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
                  src=""
                  alt=""
                >
                  {user[0]}
                  <p className="absolute h-3 w-3 bg-green-400 rounded-full -bottom-1 right-1"></p>
                </div>
                <p className="text-gray-500 text-[12px]">{user}</p>
              </div>
            ))} */}
            </div>
          </div>
        </div>
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
    <div
      onClick={async () => {
        if (selectedUsersForGroup.length > 0) return;
        dispatch(setIsChatOpen(true));
        const res = await createConversation([userr, user]);
        if (res.data.success) {
          dispatch(setIsChatOpen(true));
          dispatch(setOponentUser(userr));
          dispatch(setConversation(res.data.conversation));
        }
      }}
      className=" cursor-pointer flex items-center  gap-2"
    >
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
