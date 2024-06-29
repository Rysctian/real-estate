import React, { createContext, useEffect, useState, ReactNode } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  contactNumber?: string;
}

interface AuthContextType {
  currentUser: User | null;
  updateUser: (data: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateUser: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const updateUser = (data: User | null) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
