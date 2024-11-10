import HomeSideBar from "../components/HomeSideBar";
import { useEffect, useState } from "react";
import HomeRight from "../home/HomeRight";
import CallLeft from "./CallLeft";

const Contacts = () => {
  const [dimensions, setdimensions] = useState({ width: 0, height: 0 });

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
      <HomeSideBar active={5}></HomeSideBar>
      <CallLeft dimensions={dimensions} />
      <HomeRight />

      {/* profile left side  */}
    </div>
  );
};

export default Contacts;
