import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Home from "./home/Home";
import Users from "./users/Users";
import Chats from "./chats/Chats";
import Contacts from "./contacts/Contacts";
import Profile from "./profile/Profile";
import Calls from "./calls/Calls";
import Setting from "./settings/Settings";
import { useDispatch, useSelector } from "react-redux";
import Transparent_Loader from "./components/Transparent_Loader";
import { useEffect } from "react";
import { setIsLoading } from "../store/slices/userSlice";
import ProtectedRouteForLogin from "../protectedRoutes/ProtectedRouteForLogin";

const App = () => {
  const { isLoading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 2000);
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Transparent_Loader className="bg-darkbg_2" />
      ) : (
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            {/* Protected Parent Route */}
            <Route
              element={
                <ProtectedRouteForLogin
                />
              }
            >
              {/* Child Routes under Protected Parent */}
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/settings" element={<Setting />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
