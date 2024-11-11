import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Transparent_Loader from "../src/components/Transparent_Loader";
const ProtectedRoute_IfLoginNavigateToHome = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return <Transparent_Loader className={"bg-darkbg_2"} />;
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute_IfLoginNavigateToHome;
