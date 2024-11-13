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
import {
  setAllUsers,
  setisAuthenticated,
  setIsLoading,
  setUser,
} from "../store/slices/userSlice";
import ProtectedRouteForLogin from "../protectedRoutes/ProtectedRouteForLogin";
import ProtectedRoute_IfLoginNavigateToHome from "../protectedRoutes/ProtectedRoute_IfLoginNavigateToHome";
import axios from "axios";
import Cookies from "js-cookie";
import { dbUrl } from "./utils";
import { getAllUsers } from "../helpers/functions";

const App = () => {
  const { isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // check-authentication

  const checkAuthentication = async (token) => {
    try {
      const res = await axios.get(`${dbUrl}/check-authentication`, {
        headers: { Authorization: token },
      });
      if (res?.data?.success) {
        dispatch(setUser(res?.data?.user));
        dispatch(setisAuthenticated(true));
      }
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getusers = async () => {
    const res = await getAllUsers();
    if (res.data?.success) {
      console.log(res?.data);
      dispatch(setAllUsers(res?.data?.users));
    }
  };

  useEffect(() => {
    if (user) getusers();
  }, [user]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      checkAuthentication(token);
    }
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 2200);
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Transparent_Loader className="bg-darkbg_2" />
      ) : (
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/signin"
              element={
                <ProtectedRoute_IfLoginNavigateToHome>
                  <Login />
                </ProtectedRoute_IfLoginNavigateToHome>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute_IfLoginNavigateToHome>
                  <Register />
                </ProtectedRoute_IfLoginNavigateToHome>
              }
            />

            {/* Protected Parent Route */}
            {/* Child Routes under Protected Parent */}
            <Route
              path="/"
              element={
                <ProtectedRouteForLogin>
                  <Home />{" "}
                </ProtectedRouteForLogin>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRouteForLogin>
                  <Users />{" "}
                </ProtectedRouteForLogin>
              }
            />
            <Route
              path="/chats"
              element={
                <ProtectedRouteForLogin>
                  <Chats />{" "}
                </ProtectedRouteForLogin>
              }
            />
            <Route
              path="/contacts"
              element={
                <ProtectedRouteForLogin>
                  <Contacts />{" "}
                </ProtectedRouteForLogin>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteForLogin>
                  <Profile />{" "}
                </ProtectedRouteForLogin>
              }
            />
            <Route
              path="/calls"
              element={
                <ProtectedRouteForLogin>
                  <Calls />{" "}
                </ProtectedRouteForLogin>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRouteForLogin>
                  <Setting />{" "}
                </ProtectedRouteForLogin>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
