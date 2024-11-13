import { useEffect, useState } from "react";
import { addToContact } from "../../helpers/functions";
import { useSelector } from "react-redux";
import { IoMdPersonAdd } from "react-icons/io";

const UserContactCart_users = ({ userr }) => {
  const { user } = useSelector((state) => state.user);
  const [isAlreadyInContact, setisAlreadyInContact] = useState(false);

  useEffect(() => {
    if (user && userr) {
      const isalready = user?.contacts?.find((id) => id === userr?._id);
      if (isalready) {
        setisAlreadyInContact(true);
      } else {
        setisAlreadyInContact(false);
      }
    }
  }, [user, userr]);

  return (
    <div
      onClick={async () => {
        if (!isAlreadyInContact) {
          const res =await addToContact(userr?._id);
          if (res.data.success) setisAlreadyInContact(true);
        }
      }}
      className=" flex cursor-pointer items-center justify-between"
    >
      <div className="flex gap-2 items-center">
        <div
          className="h-9 w-9  rounded-full relative bg-primary flex justify-center items-center"
          src=""
          alt=""
        >
          {userr?.name[0]}
        </div>
        <div>
          <p className="text-[13px] text-gray-500 leading-tight">
            {userr?.email}
          </p>
          <div className="text-[12px] flex items-center gap-1 text-gray-600 leading-tight">
            {/* <GoArrowDown className="text-green-500 rotate-45" /> */}
            <p>+91 {userr?.phoneNumber}</p>
          </div>
        </div>
      </div>
      {!isAlreadyInContact && <IoMdPersonAdd className="text-gray-400" />}

      {/* <p className="text-green-500 text-xl">{call?.type == "audioCall" ? <IoCall /> : <IoVideocam />}</p> */}
    </div>
  );
};

export default UserContactCart_users;
