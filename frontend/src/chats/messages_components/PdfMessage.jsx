import { MdDownload, MdOutlineAttachment } from "react-icons/md";

const PdfMessage = () => {
  return (
    <>
      <div className="p-2 w-[60%] ml-auto max-w-[200px]  rounded-lg bg-[#31fc5d3e]">
        <div className="flex  border-2 border-green-500 p-2 gap-1  rounded-md justify-between items-center">
          <MdOutlineAttachment className="text-green-500 text-[35px] rounded-full  bg-[#31fc5d26] p-2" />
          <p className="text-sm text-darkbg_2">No 2838 jhhd...</p>
          <MdDownload className="text-2xl" />
        </div>
      </div>
      <div className="p-2 w-[60%]  max-w-[200px]  rounded-lg bg-[#1964dd31]">
        <div className="flex  border-2 border-blue-500 p-2 gap-1  rounded-md justify-between items-center">
          <MdOutlineAttachment className="text-blue-500 text-[35px] rounded-full  bg-[#1964dd4b] p-2" />
          <p className="text-sm text-darkbg_2">No 2838 jhhd...</p>
          <MdDownload className="text-2xl" />
        </div>
      </div>
    </>
  );
};

export default PdfMessage;
