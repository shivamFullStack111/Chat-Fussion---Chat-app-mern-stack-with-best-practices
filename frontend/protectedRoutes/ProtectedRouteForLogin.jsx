import { useSelector } from "react-redux";
import Transparent_Loader from "../src/components/Transparent_Loader";
import { Navigate } from "react-router-dom";

const ProtectedRouteForLogin = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return <Transparent_Loader className={"bg-darkbg"} />;
  } else {
    if (isAuthenticated) {
      return children;
    } else {
      return <Navigate to={"/signin"} />;
    }
  }
};

export default ProtectedRouteForLogin;
