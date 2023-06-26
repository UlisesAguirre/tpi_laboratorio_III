import React, { createContext, useState, useEffect } from 'react';
import iconUser from "../../assets/img/user.png"
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, role, name, lastname) => {
    const fullName = `${name} ${lastname}`;
    const userData = { email, role, name: fullName, icon: iconUser };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };