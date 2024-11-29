import HomeSideBar from "../components/HomeSideBar";
import { useEffect, useState } from "react";
import SettingLeft from "./SettingLeft";
import HomeRight from '../home/HomeRight'
import { useSelector } from "react-redux";


const Settings = () => {

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
      <HomeSideBar active={7}></HomeSideBar>
      <SettingLeft dimensions={dimensions}></SettingLeft>
      <HomeRight/>
      {/* profile left side  */}
    </div>
  );
};

export default Settings;
