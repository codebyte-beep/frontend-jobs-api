import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleSetCurrentUser = (token) => {
    setCurrentUser(token );
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser: handleSetCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};