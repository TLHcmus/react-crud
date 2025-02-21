import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState({ email: "", auth: false });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setUser({ email, auth: true });
    }
  }, []);

  const login = (email, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUser({ email, auth: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser({ email: "", auth: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
