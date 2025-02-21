import { createContext, useState } from "react";

const UsersContext = createContext();

export const UsersProvider = function ({ children }) {
  const [users, setUsers] = useState([]);

  const value = {
    users,
    setUsers,
  };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export default UsersContext;
