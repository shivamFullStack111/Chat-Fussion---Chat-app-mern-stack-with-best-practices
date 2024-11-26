import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setActiveUsers,
  setAllUsers,
  setisAuthenticated,
  setIsLoading,
  setUser,
} from "../store/slices/userSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { dbUrl, returnToken } from "./utils";
import { getAllUsers } from "../helpers/functions";
import { useSocket } from "./SocketProvider";

function AppFunctionProvider({ children }) {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { conversation } = useSelector((state) => state.chat);

  const { socket } = useSocket();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on("activeUsers", (activeUserss) => {
      console.log(activeUserss);
      dispatch(setActiveUsers(activeUserss));
    });

    return () => {
      socket.off("activeUsers");
      socket.off("newMessage");
    };
  }, [socket, conversation]);

  useEffect(() => {
    if (!socket || !isAuthenticated) return;

    if (user?.status === "active") {
      socket.emit("me", user?.email);
    }
  }, [socket]);

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

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit("join-group-conversations", user);
  }, [socket, user]);

  return children;
}

export default AppFunctionProvider;
