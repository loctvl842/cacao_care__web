import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

// export const socket = io("https://cacao-care.herokuapp.com");
const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  // const socket = io("http://localhost:8400");
  const socket = io("https://cacao-care.herokuapp.com");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server through Socket.io");
    });
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
