import { createContext } from "react";
import { io } from "socket.io-client";

const { REACT_APP_SOCKET_ENDPOINT } = process.env;

export const socket = io(REACT_APP_SOCKET_ENDPOINT);
export const SocketContext = createContext();
