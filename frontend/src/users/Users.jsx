import HomeSideBar from "../components/HomeSideBar";
import { useEffect, useState } from "react";
import UserLeft from "./UserLeft";
import HomeRight from '../home/HomeRight'
const Users = () => {
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
      <HomeSideBar active={6}></HomeSideBar>
      <UserLeft dimensions={dimensions} />
      <HomeRight/>
      {/* profile left side  */}
    </div>
  );
};

export default Users;
