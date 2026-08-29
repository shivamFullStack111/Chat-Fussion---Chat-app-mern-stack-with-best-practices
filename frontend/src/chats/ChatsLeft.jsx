// /* eslint-disable react/prop-types */
// import { FaSearch } from "react-icons/fa";
// import brandLogo from "../images/brandLogo.png";
// import { useDispatch, useSelector } from "react-redux";
// import { FaAngleDown } from "react-icons/fa6";

// import {
//   createConversation,
//   getContactsBySearch,
// } from "../../helpers/messageFunctions";
// import {
//   setallMessages,
//   setConversation,
//   setIsChatOpen,
//   setOponentUser,
// } from "../../store/slices/chatSlice";

// import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import { useEffect, useState } from "react";
// import { IoIosAddCircle } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { RxCrossCircled } from "react-icons/rx";
// import { motion } from "framer-motion";
// import Button from "../components/Button";
// import { toast, Toaster } from "react-hot-toast";
// import { BiSolidMessageAdd } from "react-icons/bi";
// import { FaArrowLeft } from "react-icons/fa6";
// import axios from "axios";

// const ChatLeft = ({ dimensions }) => {
//   const { allUsers, user, allConversation } = useSelector(
//     (state) => state.user,
//   );
//   const [isGroupCreating, setisGroupCreating] = useState(false);
//   const [selectedUsersForGroup, setselectedUsersForGroup] = useState([]);
//   const [groupName, setgroupName] = useState("");
//   const [inputValue, setinputValue] = useState("");
//   const [searchConversation, setsearchConversation] = useState([]);

//   // const [allConversation, setallConversation] = useState([]);

//   const [creatingConversation, setcreatingConversation] = useState(false);

//   const dispatch = useDispatch();

//   let type = "group";

//   useEffect(() => {
//     if (!allConversation?.length || !allUsers?.length) return;

//     if (!inputValue) {
//       setsearchConversation(allConversation);
//       return;
//     }

//     const filteredConversations = allConversation.filter((conversation) => {
//       const opponentEmail = conversation?.users?.find(
//         (usr) => usr?.email !== user?.email,
//       )?.email;

//       const opponentUser = allUsers.find((usr) => usr?.email === opponentEmail);

//       return (
//         opponentUser?.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
//         opponentUser?.email?.toLowerCase().includes(inputValue.toLowerCase()) ||
//         conversation?.groupName
//           ?.toLowerCase()
//           .includes(inputValue.toLowerCase()) ||
//         opponentUser?.phoneNumber?.toString().includes(inputValue)
//       );
//     });

//     setsearchConversation(filteredConversations);
//   }, [inputValue, allConversation, allUsers, user]);

//   return (
//     <>
//       <div className="w-full relative 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
//         {!creatingConversation && (
//           <>
//             <div className="p-7 pb-0">
//               {selectedUsersForGroup.length == 0 && (
//                 <>
//                   {" "}
//                   <div className="flex justify-between items-center">
//                     <p className="text-2xl font-semibold text-gray-500">
//                       Chats
//                     </p>
//                     <img
//                       className="w-10 h-10 rounded-full bg-darkbg"
//                       src={brandLogo}
//                       alt=""
//                     />
//                   </div>
//                   <div className="flex gap-2 w-full h-full items-center mt-5">
//                     <div className="flex items-center d-full w-full bg-darkbg p-3 py-1  rounded-md">
//                       <input
//                         onChange={(e) => setinputValue(e.target.value)}
//                         placeholder="Search..."
//                         spellCheck={false}
//                         value={inputValue}
//                         className="outline-none text-sm  text-gray-300 w-full p-[5px] bg-darkbg "
//                         type="text "
//                       />
//                       <FaSearch className=" text-gray-400" />
//                     </div>
//                   </div>
//                 </>
//               )}

//               <div
//                 style={{
//                   height:
//                     dimensions?.width > 1000
//                       ? dimensions?.height - 130
//                       : dimensions?.height - 180,
//                 }}
//                 className=" overflow-y-scroll"
//               >
//                 {/* <p className="mt-6 text-[13px] text-gray-400">FAVOURITES</p> */}

//                 <div className="flex flex-col gap-2 mt-4">
//                   {searchConversation?.map((conversation, i) => {
//                     if (conversation?.type !== "group") {
//                       return (
//                         <ConversationCard
//                           selectedUsersForGroup={selectedUsersForGroup}
//                           setselectedUsersForGroup={setselectedUsersForGroup}
//                           isGroupCreating={isGroupCreating}
//                           setisGroupCreating={setisGroupCreating}
//                           key={i}
//                           dispatch={dispatch}
//                           conversation={conversation}
//                           user={user}
//                         />
//                       );
//                     } else {
//                       return (
//                         <GroupConversationCard
//                           conversation={conversation}
//                           isGroupCreating={isGroupCreating}
//                           selectedUsersForGroup={selectedUsersForGroup}
//                           user={user}
//                           setselectedUsersForGroup={setselectedUsersForGroup}
//                           key={i}
//                         />
//                       );
//                     }
//                   })}
//                 </div>
//               </div>
//             </div>
//             <div
//               onClick={() => setcreatingConversation(true)}
//               className="absolute bottom-16 1000px:bottom-4 right-4 w-8 h-8 flex justify-center items-center cursor-pointer bg-primary text-white rounded-md z-50"
//             >
//               <BiSolidMessageAdd />
//             </div>
//           </>
//         )}

//         {creatingConversation && (
//           <div className="p-7 pb-0">
//             <>
//               {" "}
//               <div className="flex gap-3 items-center">
//                 <FaArrowLeft
//                   onClick={() => setcreatingConversation(false)}
//                   className="text-gray-500  cursor-pointer text-lg"
//                 />
//                 <p className="text-2xl font-semibold text-gray-500">Add</p>
//               </div>
//               {selectedUsersForGroup.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{
//                     opacity: selectedUsersForGroup.length ? 1 : 0,
//                     height: selectedUsersForGroup.length ? "auto" : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="w-full h-52 overflow-hidden  mt-4 flex flex-col gap-2 shadow-2xl bg-darkbg p-3 rounded-lg"
//                 >
//                   <div className="flex items-center  d-full w-full     p-2 py-1  rounded-md">
//                     <input
//                       onChange={(e) => setgroupName(e.target.value)}
//                       value={groupName}
//                       placeholder="Group name"
//                       spellCheck={false}
//                       className="outline-none text-sm  text-gray-300 bg-black-700 rounded-lg py-2 w-full p-[5px]  "
//                       type="text "
//                     />
//                     <RxCross2
//                       onClick={() => {
//                         setselectedUsersForGroup([]);
//                         setisGroupCreating(false);
//                       }}
//                       size={25}
//                       className=" h-full cursor-pointer text-gray-400"
//                     />
//                   </div>
//                   <div className="flex text-sm  px-2 text-gray-400 items-center gap-5 ">
//                     <p className="">Total contacts </p>
//                     <p className="bg-blue-500 text-white w-5 h-5 flex justify-center items-center rounded-full">
//                       {selectedUsersForGroup?.length}
//                     </p>
//                   </div>
//                   <Button
//                     onClick={async () => {
//                       if (!groupName) {
//                         return toast.error("Please enter a group name");
//                       }
//                       const res = await createConversation(
//                         selectedUsersForGroup,
//                         type,
//                         groupName,
//                       );
//                       if (res.data.success) {
//                         toast.success("Group created successfully");
//                         setselectedUsersForGroup([]);
//                         setisGroupCreating(false);
//                       }
//                     }}
//                     className={
//                       "bg-primary text-white text-sm rounded-md hover:bg-pink-400 "
//                     }
//                     title={"Create Group"}
//                   ></Button>
//                 </motion.div>
//               )}
//               {selectedUsersForGroup.length == 0 && (
//                 <div className="flex gap-2 w-full h-full items-center mt-5">
//                   <div className="flex items-center d-full w-full bg-darkbg p-3 py-1  rounded-md">
//                     <input
//                       placeholder="Search..."
//                       spellCheck={false}
//                       className="outline-none text-sm  text-gray-300 w-full p-[5px] bg-darkbg "
//                       type="text "
//                     />
//                     <FaSearch className=" text-gray-400" />
//                   </div>
//                   {isGroupCreating ? (
//                     <RxCross2
//                       onClick={() => setisGroupCreating(false)}
//                       size={25}
//                       className=" h-full ml-auto cursor-pointer text-gray-400"
//                     />
//                   ) : (
//                     <AiOutlineUsergroupAdd
//                       onClick={() => setisGroupCreating((p) => true)}
//                       size={25}
//                       className=" h-full ml-auto cursor-pointer text-gray-400"
//                     />
//                   )}
//                 </div>
//               )}
//             </>

//             <div
//               style={{
//                 height:
//                   dimensions?.width > 1000
//                     ? dimensions?.height - 130
//                     : dimensions?.height - 180,
//               }}
//               className=" overflow-y-scroll"
//             >
//               <div className="flex flex-col gap-2 mt-4">
//                 {allUsers?.map((userr, i) => {
//                   if (userr?.email !== user?.email)
//                     return (
//                       <UserCard
//                         selectedUsersForGroup={selectedUsersForGroup}
//                         setselectedUsersForGroup={setselectedUsersForGroup}
//                         isGroupCreating={isGroupCreating}
//                         setisGroupCreating={setisGroupCreating}
//                         key={i}
//                         dispatch={dispatch}
//                         userr={userr}
//                         user={user}
//                       />
//                     );
//                 })}
//               </div>
//               <div className="flex flex-col gap-2 mt-4"></div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ChatLeft;

// const UserCard = ({
//   userr,
//   isGroupCreating,
//   selectedUsersForGroup,
//   setselectedUsersForGroup,
// }) => {
//   const { activeUsers } = useSelector((state) => state.user);

//   return (
//     <div className=" cursor-pointer flex items-center  gap-2">
//       {/* profileImage */}
//       {userr?.profileImage ? (
//         <>
//           {" "}
//           <div
//             className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
//             src=""
//             alt=""
//           >
//             <img
//               className="w-full h-full rounded-full object-cover"
//               src={userr?.profileImage}
//               alt=""
//             />
//           </div>
//         </>
//       ) : (
//         <>
//           {" "}
//           <div
//             className="h-8 w-8  rounded-full relative bg-primary flex justify-center items-center"
//             src=""
//             alt=""
//           >
//             {userr?.name[0]}
//             {activeUsers?.includes(userr?.email) && (
//               <p className="absolute h-3 w-3 bg-green-400 rounded-full -bottom-1 right-1"></p>
//             )}
//           </div>
//         </>
//       )}
//       <p className="text-gray-500 text-[12px]">{userr?.name}</p>
//       {isGroupCreating && (
//         <div
//           onClick={(e) => {
//             e.stopPropagation();
//             if (
//               selectedUsersForGroup.find((usr) => usr?.email == userr?.email)
//             ) {
//               const filterUsers = selectedUsersForGroup.filter(
//                 (p) => p?.email !== userr?.email,
//               );
//               setselectedUsersForGroup(filterUsers);
//             } else {
//               setselectedUsersForGroup((p) => [
//                 ...p,
//                 { email: userr?.email, _id: userr?._id },
//               ]);
//             }
//           }}
//           className="ml-auto h-full w-[40px] flex justify-center items-center "
//         >
//           {selectedUsersForGroup.find((usr) => usr?.email == userr?.email) ? (
//             <RxCrossCircled className={` text-lg text-red-500 `} />
//           ) : (
//             <IoIosAddCircle className={`text-gray-500 text-lg `} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const ConversationCard = ({ conversation, user }) => {
//   const { activeUsers } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [oponent, setoponent] = useState(null);
//   const { allUsers } = useSelector((state) => state.user);
//   const [isImageShow, setisImageShow] = useState(false);
//   const [optionsOpen, setoptionsOpen] = useState(false);

//   useEffect(() => {
//     if (!user || !oponent) return;
//     if (oponent?.profilePicture == "everyone") {
//       setisImageShow(true);
//     } else if (oponent?.profilePicture == "nobody") {
//       setisImageShow(false);
//     } else if (oponent?.profilePicture == "friends") {
//       const isExist = user?.contacts?.find((userid) => userid == oponent?._id);
//       if (isExist) {
//         setisImageShow(true);
//       }
//     }

//     // console.log(isImageShow);
//   }, [user, oponent, isImageShow]);

//   useEffect(() => {
//     const userForSearch = conversation.users.find(
//       (usrrr) => usrrr?.email !== user?.email,
//     );
//     const opnt = allUsers.find((usr) => usr?.email == userForSearch?.email);
//     setoponent(opnt);
//   }, [conversation]);

//   return (
//     <div
//       onClick={() => {
//         console.log(conversation);
//         dispatch(setConversation(conversation));
//         dispatch(setallMessages([]));

//         dispatch(setIsChatOpen(true));

//         dispatch(setOponentUser(oponent));
//       }}
//       className="flex group w-full cursor-pointer justify-between items-center "
//     >
//       <div className="flex gap-2  w-full b items-center">
//         <div className="h-9 relative  w-9 bg-white rounded-full">
//           {oponent?.profileImage && isImageShow ? (
//             <>
//               <img
//                 src={oponent?.profileImage}
//                 className="h-full w-full rounded-full"
//                 alt=""
//               />
//               {activeUsers?.includes(oponent?.email) && (
//                 <p className="absolute  h-3 w-3 bg-green-400 rounded-full -bottom-1 right-1"></p>
//               )}
//             </>
//           ) : (
//             <div
//               className="h-9 w-9  rounded-full relative bg-primary flex justify-center items-center"
//               src=""
//               alt=""
//             >
//               {oponent?.name[0]}
//               {activeUsers?.includes(oponent?.email) && (
//                 <p className="absolute h-3 w-3 bg-green-400 rounded-full -bottom-1 right-1"></p>
//               )}
//             </div>
//           )}
//         </div>
//         <div>
//           <div className="text-sm leading-tight text-gray-400">
//             {oponent?.name}
//           </div>
//           <div className="text-sm text-[12px] leading-tight text-gray-500">
//             byee
//           </div>
//         </div>

//         <div className="relative w-full flex ml-auto!">
//           <div onClick={()=>setoptionsOpen(true)} className="hidden text-white ml-auto group-hover:block">
//             <FaAngleDown />
//           </div>
//           {optionsOpen && (
//             <div className="ml-auto absolute  transition-all duration-150  ">
//               <div>Delete</div>
//               <div>Block</div>
//               <div>Exit Group</div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const GroupConversationCard = ({ conversation }) => {
//   const dispatch = useDispatch();
//   return (
//     <div
//       onClick={() => {
//         dispatch(setIsChatOpen(true));
//         dispatch(setConversation(conversation));
//         dispatch(setOponentUser(null));
//       }}
//       className="flex cursor-pointer justify-between items-center"
//     >
//       <div className="flex items-center gap-2">
//         <div className="h-9 w-9 bg-white rounded-full">
//           <img
//             className="w-full object-cover h-full rounded-full"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLurOKOnrd7Q0-lQGBiF-6e8XBbf9dp2roQg&s"
//             alt=""
//           />
//         </div>
//         <div>
//           <div className="text-sm leading-tight text-gray-400">
//             {conversation?.groupName}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import brandLogo from "../images/brandLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa6";

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
import { handleBlockUser, handleUnblockUser } from "../../helpers/functions";
import { setUser } from "../../store/slices/userSlice";

const ChatLeft = ({ dimensions }) => {
  const { allUsers, user, allConversation } = useSelector(
    (state) => state.user,
  );
  const [isGroupCreating, setisGroupCreating] = useState(false);
  const [selectedUsersForGroup, setselectedUsersForGroup] = useState([]);
  const [groupName, setgroupName] = useState("");
  const [inputValue, setinputValue] = useState("");
  const [searchConversation, setsearchConversation] = useState([]);
  const [creatingConversation, setcreatingConversation] = useState(false);

  const dispatch = useDispatch();

  let type = "group";

  useEffect(() => {
    if (!allConversation?.length || !allUsers?.length) return;

    if (!inputValue) {
      setsearchConversation(allConversation);
      return;
    }

    const filteredConversations = allConversation.filter((conversation) => {
      const opponentEmail = conversation?.users?.find(
        (usr) => usr?.email !== user?.email,
      )?.email;

      const opponentUser = allUsers.find((usr) => usr?.email === opponentEmail);

      return (
        opponentUser?.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
        opponentUser?.email?.toLowerCase().includes(inputValue.toLowerCase()) ||
        conversation?.groupName
          ?.toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        opponentUser?.phoneNumber?.toString().includes(inputValue)
      );
    });

    setsearchConversation(filteredConversations);
  }, [inputValue, allConversation, allUsers, user]);

  return (
    <>
      <div className="w-full relative 1000px:min-w-[330px] 1000px:max-w-[330px] h-[100vh] bg-darkbg_2 flex flex-col overflow-hidden">
        {!creatingConversation && (
          <>
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700/30 bg-darkbg_2/95 sticky top-0 z-10 flex-shrink-0">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-200 tracking-wide">
                  Chats
                </p>
                <div className="h-8 w-8 rounded-full bg-darkbg overflow-hidden border border-gray-600/30 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={brandLogo}
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-3 py-2.5 bg-darkbg_2/90 sticky top-[57px] z-10 flex-shrink-0">
              <div className="flex items-center gap-2 bg-darkbg rounded-lg px-3 py-1.5 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <FaSearch className="text-gray-500 text-sm flex-shrink-0" />
                <input
                  onChange={(e) => setinputValue(e.target.value)}
                  placeholder="Search or start new chat"
                  spellCheck={false}
                  value={inputValue}
                  className="outline-none text-sm text-gray-300 w-full bg-transparent py-1 placeholder:text-gray-500 min-w-0"
                  type="text"
                />
              </div>
            </div>

            {/* Chat List */}
            <div
              style={{
                height:
                  dimensions?.width > 1000
                    ? dimensions?.height - 130
                    : dimensions?.height - 180,
              }}
              className="overflow-y-auto px-1.5 pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent flex-1"
            >
              <div className="flex flex-col">
                {searchConversation?.length > 0 ? (
                  searchConversation?.map((conversation, i) => {
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
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-gray-500 text-sm">
                    <p className="text-gray-600">No conversations yet</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Start a new chat
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* New Chat Button */}
            <div
              onClick={() => setcreatingConversation(true)}
              className="absolute bottom-5 right-5 w-11 h-11 flex justify-center items-center cursor-pointer bg-primary text-white rounded-full shadow-lg hover:scale-105 hover:shadow-primary/30 transition-all duration-200 z-50"
            >
              <BiSolidMessageAdd size={20} />
            </div>
          </>
        )}

        {creatingConversation && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700/30 bg-darkbg_2/95 sticky top-0 z-10 flex-shrink-0">
              <div className="flex gap-2 items-center">
                <FaArrowLeft
                  onClick={() => {
                    setcreatingConversation(false);
                    setselectedUsersForGroup([]);
                    setisGroupCreating(false);
                    setgroupName("");
                  }}
                  className="text-gray-400 cursor-pointer text-base hover:text-gray-300 transition-colors flex-shrink-0"
                />
                <p className="text-lg font-semibold text-gray-200 tracking-wide truncate">
                  New Chat
                </p>
                {selectedUsersForGroup.length > 0 && (
                  <div className="ml-auto flex items-center gap-2 bg-primary/20 px-2.5 py-1 rounded-full">
                    <span className="text-xs text-primary font-medium">
                      {selectedUsersForGroup.length}
                    </span>
                    <span className="text-xs text-gray-400">selected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Group Creation Panel - FIXED */}
            {selectedUsersForGroup.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: selectedUsersForGroup.length ? 1 : 0,
                  height: selectedUsersForGroup.length ? "auto" : 0,
                }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden bg-darkbg/60 border-b border-gray-700/30 px-3 py-2.5 flex-shrink-0"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex-1 min-w-0">
                    <input
                      onChange={(e) => setgroupName(e.target.value)}
                      value={groupName}
                      placeholder="Enter group name"
                      spellCheck={false}
                      className="outline-none text-sm text-gray-300 bg-darkbg rounded-lg px-3 py-1.5 w-full placeholder:text-gray-500 border border-gray-700/30 focus:border-primary/50 transition-colors"
                      type="text"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      onClick={async () => {
                        if (!groupName) {
                          return toast.error("Please enter a group name");
                        }
                        const res = await createConversation(
                          selectedUsersForGroup,
                          type,
                          groupName,
                        );
                        if (res.data.success) {
                          toast.success("Group created successfully");
                          setselectedUsersForGroup([]);
                          setisGroupCreating(false);
                          setgroupName("");
                          setcreatingConversation(false);
                        }
                      }}
                      className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg hover:bg-primary/80 transition-colors font-medium whitespace-nowrap"
                      title={"Create Group"}
                    >
                      Create
                    </Button>
                    <div
                      onClick={() => {
                        setselectedUsersForGroup([]);
                        setisGroupCreating(false);
                        setgroupName("");
                      }}
                      className="text-gray-500 hover:text-gray-300 cursor-pointer p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <RxCross2 size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Search Bar */}
            <div className="px-3 py-2.5 bg-darkbg_2/90 sticky top-[57px] z-10 flex-shrink-0">
              <div className="flex items-center gap-2 bg-darkbg rounded-lg px-3 py-1.5 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <FaSearch className="text-gray-500 text-sm flex-shrink-0" />
                <input
                  placeholder="Search contacts..."
                  spellCheck={false}
                  className="outline-none text-sm text-gray-300 w-full bg-transparent py-1 placeholder:text-gray-500 min-w-0"
                  type="text"
                />
                {isGroupCreating ? (
                  <RxCross2
                    onClick={() => {
                      setisGroupCreating(false);
                      setselectedUsersForGroup([]);
                    }}
                    size={18}
                    className="cursor-pointer text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
                  />
                ) : (
                  <AiOutlineUsergroupAdd
                    onClick={() => setisGroupCreating(true)}
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
                  />
                )}
              </div>
            </div>

            {/* Contact List */}
            <div
              style={{
                height:
                  dimensions?.width > 1000
                    ? dimensions?.height - 130
                    : dimensions?.height - 180,
              }}
              className="overflow-y-auto px-1.5 pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent flex-1"
            >
              <div className="flex flex-col gap-0.5 mt-1">
                {allUsers?.filter((u) => u?.email !== user?.email).length >
                0 ? (
                  allUsers?.map((userr, i) => {
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
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-500 text-sm">
                    <p className="text-gray-600">No contacts found</p>
                  </div>
                )}
              </div>
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
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
      <div className="relative flex-shrink-0">
        <div className="h-9 w-9 rounded-full bg-primary flex justify-center items-center text-gray-300 font-medium text-xs overflow-hidden">
          {userr?.profileImage ? (
            <img
              className="w-full h-full rounded-full object-cover"
              src={userr?.profileImage}
              alt=""
            />
          ) : (
            userr?.name?.[0]?.toUpperCase() || "U"
          )}
        </div>
        {activeUsers?.includes(userr?.email) && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-darkbg_2"></span>
        )}
      </div>
      <p className="text-gray-300 text-sm font-medium flex-1 truncate">
        {userr?.name}
      </p>
      {isGroupCreating && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (
              selectedUsersForGroup.find((usr) => usr?.email == userr?.email)
            ) {
              const filterUsers = selectedUsersForGroup.filter(
                (p) => p?.email !== userr?.email,
              );
              setselectedUsersForGroup(filterUsers);
            } else {
              setselectedUsersForGroup((p) => [
                ...p,
                { email: userr?.email, _id: userr?._id },
              ]);
            }
          }}
          className="flex justify-center items-center w-7 h-7 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
        >
          {selectedUsersForGroup.find((usr) => usr?.email == userr?.email) ? (
            <RxCrossCircled className="text-red-400 text-lg" />
          ) : (
            <IoIosAddCircle className="text-gray-500 text-lg group-hover:text-gray-300 transition-colors" />
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
  const [isImageShow, setisImageShow] = useState(false);
  const [optionsOpen, setoptionsOpen] = useState(false);

  const [isBlocked, setisBlocked] = useState(false);

  useEffect(() => {
    if (user && oponent && user.blockUsers.includes(oponent?._id)) {
      setisBlocked(true);
    }
  }, [oponent, user]);

  useEffect(() => {
    if (!user || !oponent) return;
    if (oponent?.profilePicture == "everyone") {
      setisImageShow(true);
    } else if (oponent?.profilePicture == "nobody") {
      setisImageShow(false);
    } else if (oponent?.profilePicture == "friends") {
      const isExist = user?.contacts?.find((userid) => userid == oponent?._id);
      if (isExist) {
        setisImageShow(true);
      }
    }
  }, [user, oponent, isImageShow]);

  useEffect(() => {
    const userForSearch = conversation.users.find(
      (usrrr) => usrrr?.email !== user?.email,
    );
    const opnt = allUsers.find((usr) => usr?.email == userForSearch?.email);
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
      className="group flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors relative"
    >
      <div className="relative flex-shrink-0">
        <div className="h-9 w-9 rounded-full bg-primary flex justify-center items-center text-gray-300 font-medium text-xs overflow-hidden">
          {oponent?.profileImage && isImageShow ? (
            <img
              src={
                isBlocked
                  ? "data:image/png;base64,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"
                  : oponent?.profileImage
              }
              className="h-full w-full rounded-full object-cover"
              alt=""
            />
          ) : (
            oponent?.name?.[0]?.toUpperCase() || "U"
          )}
        </div>
        {activeUsers?.includes(oponent?.email) && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-darkbg_2"></span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-300 font-medium truncate">
          {oponent?.name || "Unknown"} -{" "}
          {isBlocked && (
            <span className="text-[10px] font-semibold text-red-500">
              Blocked
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 truncate">last message...</div>
      </div>
      <div className="relative flex-shrink-0">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setoptionsOpen(!optionsOpen);
          }}
          className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-300 p-1 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          <FaAngleDown size={12} />
        </div>
        {optionsOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setoptionsOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1 bg-darkbg rounded-lg shadow-xl border border-gray-700/30 py-1 min-w-[120px] z-20">
              <div className="px-3.5 py-1.5 text-sm text-gray-400 hover:bg-white/5 cursor-pointer transition-colors">
                Delete Chat
              </div>
              <div
                onClick={async () => {
                  if (!isBlocked) {
                    const res = await handleBlockUser(oponent?._id);
                    if (res.data.success) {
                      toast.success(res.data.message);
                      setisBlocked(true);
                      setoptionsOpen(false)
                      return dispatch(setUser(res.data.user));
                    } else {
                      return toast.error(res.data.message);
                    }
                  } else {
                    const res = await handleUnblockUser(oponent?._id);
                    if (res.data.success) {
                      toast.success(res.data.message);
                      setisBlocked(false);
                                            setoptionsOpen(false)

                      return dispatch(setUser(res.data.user));
                    } else {
                      return toast.error(res.data.message);
                    }
                  }
                }}
                className="px-3.5 py-1.5 text-sm text-gray-400 hover:bg-white/5 cursor-pointer transition-colors"
              >
                {isBlocked ? "Unblock" : "Block"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const GroupConversationCard = ({ conversation }) => {
  const dispatch = useDispatch();
  const [optionsOpen, setoptionsOpen] = useState(false);
  return (
    <div
      onClick={() => {
        dispatch(setIsChatOpen(true));
        dispatch(setConversation(conversation));
        dispatch(setOponentUser(null));
      }}
      className="flex group items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
    >
      <div className="relative flex-shrink-0">
        <div className="h-9 w-9 rounded-full bg-primary flex justify-center items-center text-gray-300 font-medium text-xs overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPl6K44T6p748gXF2IZw2HhtwjX6DaGlMos03CrYs8g&s=10"
            alt=""
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-300 font-medium truncate">
          {conversation?.groupName || "Group"}
        </div>
        <div className="text-xs text-gray-500 truncate">group chat</div>
      </div>
      <div className="relative flex-shrink-0">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setoptionsOpen(!optionsOpen);
          }}
          className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-300 p-1 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          <FaAngleDown size={12} />
        </div>
        {optionsOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setoptionsOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1 bg-darkbg rounded-lg shadow-xl border border-gray-700/30 py-1 min-w-[120px] z-20">
              <div className="px-3.5 py-1.5 text-sm text-red-400 hover:bg-white/5 cursor-pointer transition-colors border-t border-gray-700/30">
                Exit Group
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
