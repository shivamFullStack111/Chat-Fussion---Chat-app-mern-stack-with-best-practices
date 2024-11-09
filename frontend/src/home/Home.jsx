import HomeSideBar from "../components/HomeSideBar";
import { useEffect, useState } from "react";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";

const Home = () => {
  const [dimensions, setdimensions] = useState({ width: 0, height: 0 });
  const [statusOpen, setstatusOpen] = useState(false);
  const [active, setactive] = useState(0);

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
      <HomeSideBar active={1}></HomeSideBar>
      {/* profile left side  */}
      <HomeLeft
        active={active}
        dimensions={dimensions}
        setactive={setactive}
        setstatusOpen={setstatusOpen}
        statusOpen={statusOpen}
      />
      {/* right side  */}
      <HomeRight />
    </div>
  );
};

export default Home;
