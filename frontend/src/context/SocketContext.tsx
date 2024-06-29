import React, { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { AuthContext } from "./AuthContextProvider";

export const SocketContext = createContext<{ socket: Socket | null }>({
  socket: null,
});

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
  currentUser && socket?.emit("newUser", currentUser.id);
  }, [currentUser, socket]);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
