import HomeSideBar from "../components/HomeSideBar";
import { useEffect, useState } from "react";
import HomeRight from "../home/HomeRight";
import ContactLeft from "./ContactLeft";

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
      <HomeSideBar active={4}></HomeSideBar>
      <ContactLeft dimensions={dimensions} />
      
      <HomeRight />

      {/* profile left side  */}
    </div>
  );
};

export default Contacts;
