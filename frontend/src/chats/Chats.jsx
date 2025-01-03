import HomeSideBar from "../components/HomeSideBar";
import { useEffect, useState } from "react";
import ChatLeft from "./ChatsLeft";
import ChatScreen from "./ChatScreen";
import HomeRight from "../home/HomeRight";
import { useSelector } from "react-redux";

const Chats = () => {
  const [dimensions, setdimensions] = useState({ width: 0, height: 0 });
  const { isChatOpen, oponentUser } = useSelector((state) => state.chat);

  const handleResize = () => {
    let h = window.innerHeight;
    let w = window.innerWidth;
    setdimensions({ width: w, height: h });
  };

  useEffect(() => {
    let h = window.innerHeight;
    let w = window.innerWidth;
    setdimensions({ width: w, height: h });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 

  return (
    <div className="flex h-[100vh] overflow-hidden">
      <HomeSideBar active={3}></HomeSideBar>
      <ChatLeft dimensions={dimensions} />
      {isChatOpen ? <ChatScreen /> : <HomeRight />}

      {/* profile left side  */}
    </div>
  );
};

export default Chats;
