import { MdDownload, MdOutlineAttachment } from "react-icons/md";
import { useSelector } from "react-redux";

const PdfMessage = ({ message }) => {
  const { user } = useSelector((state) => state.user);

  const fileUrl = message?.message?.url?.replace(
    "/upload/",
    "/upload/fl_attachment/"
  );

  return (
    <>
      {user?.email === message?.sender ? (
        <div className="p-2 w-[60%] ml-auto max-w-[200px] rounded-lg bg-[#31fc5d3e]">
          <div className="flex border-2 border-green-500 p-2 gap-1 rounded-md justify-between items-center">
            <MdOutlineAttachment className="text-green-500 text-[35px] rounded-full bg-[#31fc5d26] p-2" />
            <p className="text-sm text-darkbg_2">
              {message?.message?.fileName?.slice(0, 5)}...
            </p>
            <a href={fileUrl}>
              {" "}
              <MdDownload
                // onClick={handleDownload}
                className="text-2xl cursor-pointer"
              />
            </a>
          </div>
        </div>
      ) : (
        <div className="p-2 w-[60%] max-w-[200px] rounded-lg bg-[#1964dd31]">
          <div className="flex border-2 border-blue-500 p-2 gap-1 rounded-md justify-between items-center">
            <MdOutlineAttachment className="text-blue-500 text-[35px] rounded-full bg-[#1964dd4b] p-2" />
            <p className="text-sm text-darkbg_2">
              {message?.message?.fileName?.slice(0, 5)}...
            </p>
            <a href={fileUrl}>
              {" "}
              <MdDownload
                // onClick={handleDownload}
                className="text-2xl cursor-pointer"
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfMessage;
