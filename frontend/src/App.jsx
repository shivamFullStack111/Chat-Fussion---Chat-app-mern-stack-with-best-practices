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
import { useEffect, useRef, useState } from "react";
import {
  setActiveUsers,
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
import { useSocket } from "./SocketProvider";
import CallSending from "./AudioCallComponents/CallSending";
import {
  setCallOponent,
  setCallType,
  setIsCallComing,
} from "../store/slices/callSlice";
import CallComming from "./AudioCallComponents/CallComming";
import { setallMessages } from "../store/slices/chatSlice";

const App = () => {
  const { isLoading, user, isAuthenticated, activeUsers } = useSelector(
    (state) => state.user
  );

  const { allMessages, conversation } = useSelector((state) => state.chat);

  const { isCallComing, isCallActive, call_oponent, call_type, isCallSending } =
    useSelector((state) => state.call);

  const { socket } = useSocket();

  const dispatch = useDispatch();



  useEffect(() => {
    if (!socket) return;

    socket.on("activeUsers", (activeUserss) => {
      console.log(activeUserss);
      dispatch(setActiveUsers(activeUserss));
    });

    // socket.on("newMessage", (message) => {
    //   console.log(message?.conversationid == conversation?._id);
    //   console.log(message?.conversationid, conversation);
    //   if (message?.conversationid == conversation?._id) {
    //     dispatch(setallMessages([...allMessages, message]));
    //   }
    // });

    return () => {
      socket.off("activeUsers");
      socket.off("newMessage");
    };
  }, [socket,conversation]);

  useEffect(() => {
    if (!socket || !isAuthenticated) return;

    if (user?.status === "active") {
      socket.emit("me", user?.email);
    }
  }, [socket]);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const getusers = async () => {
    const res = await getAllUsers();
    if (res.data?.success) {
      dispatch(setAllUsers(res?.data?.users));
    }
  };

  useEffect(() => {
    if (isAuthenticated) getusers();
  }, [isAuthenticated]);

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
      <>
        {!isCallComing && <CallSending />}
        {!isCallSending && <CallComming />}
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
    </>
  );
};

export default App;
