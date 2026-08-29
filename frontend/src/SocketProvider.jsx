import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Io from "socket.io-client";
import { config } from "./config/config";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    let newSocket;
    if (isAuthenticated) {
      newSocket = Io(`${config?.API_URL}`, {
        transports: ["websocket"],
      });
      setsocket(newSocket);
    }

    return () => {
      if (socket) {
        newSocket.off();
      }
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
