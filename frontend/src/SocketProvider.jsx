import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Io from "socket.io-client";
import { dbUrl } from "./utils";

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
      newSocket = Io(`${dbUrl}`, {
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
