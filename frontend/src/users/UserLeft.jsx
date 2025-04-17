/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";
import brandLogo from "../images/brandLogo.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserContactCart_users from "./UserContactCart_users";

const UserLeft = ({ dimensions }) => {
  const { allUsers,user } = useSelector((state) => state.user);
  const [searchUsers, setsearchUsers] = useState([]);

  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    if (allUsers?.length) setsearchUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    if (!allUsers?.length) return;
    if (!searchText) {
      setsearchUsers(allUsers);
    }
    const time = setTimeout(() => {
      const filterUsers = allUsers?.filter(
        (usr) =>
          usr?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
          usr?.email?.toLowerCase().includes(searchText?.toLowerCase()) ||
          usr?.phoneNumber?.toString().includes(searchText)
      );

      setsearchUsers(filterUsers);
    }, 200);

    return () => {
      clearTimeout(time);
    };
  }, [searchText, allUsers]);

  return (
    <div className="w-full 1000px:min-w-[330px] 1000px:max-w-[330px]  h-[100vh] bg-darkbg_2">
      <div className="p-7 pb-0">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-gray-500">Users</p>
          <img
            className="w-10 h-10 rounded-full bg-darkbg"
            src={brandLogo}
            alt=""
          />
        </div>
        <div className="flex items-center bg-darkbg p-3 py-1 mt-5 rounded-md">
          <input
            onChange={(e) => setsearchText(e.target.value)}
            value={searchText}
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
          <div className="flex flex-col gap-3 mt-4">
            {searchUsers?.length
              ? searchUsers?.map((usr, i) => {
                return <> {usr?._id!==user?._id&&<UserContactCart_users key={i} userr={usr} i={i} />}</>
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLeft;
