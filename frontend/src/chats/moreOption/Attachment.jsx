import { useDispatch, useSelector } from "react-redux";
import { dbUrl, returnToken } from "../../utils";
import axios from "axios";
import { MdOutlineAttachment } from "react-icons/md";
import { setallMessages } from "../../../store/slices/chatSlice";

function Attachment() {
  const { user } = useSelector((state) => state.user);
  const { oponentUser, conversation, allMessages } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch((state) => state.user);

  return (
    <>
      {" "}
      <input
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.zip,.7z,.rar"
        id="attachment"
        className="hidden"
        onChange={async (e) => {
          let array = Array.from(e.target.files);

          const token = returnToken();

          const formdata = new FormData();

          array.forEach((file) => {
            formdata.append("file", file);
          });
          formdata.append("conversationid", conversation._id);
          formdata.append("type", "document");
          formdata.append("receiver", oponentUser?.email);

          const res = await axios.post(
            `${dbUrl}/create-document-message`,
            formdata,
            { headers: { Authorization: token } }
          );

          if (res.data.success) {
            dispatch(
              setallMessages([
                ...allMessages,
                ...[...(res?.data?.messages || [])],
              ])
            );
          }
        }}
        multiple
        type="file"
      />
      <label htmlFor="attachment" className="flex flex-col items-center">
        <div className="p-2  1000px:text-xl bg-[#31fc5d21] text-[#31fc5d91] cursor-pointer rounded-full  ">
          <MdOutlineAttachment />
        </div>
        <p className="text-[8px] 1000px:text-[11px] mt-1 text-gray-300">
          Attachment
        </p>
      </label>
    </>
  );
}
export default Attachment;
