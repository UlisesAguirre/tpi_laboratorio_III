<<<<<<< HEAD
import React, { createContext, useState } from 'react';

=======
import React, { createContext, useState, useEffect } from 'react';
import iconUser from "../../assets/img/user.png"
>>>>>>> bb8c4b32b800376c10506fe4d54d6ba9521540e1
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, role, name, lastname) => {
    const fullName = `${name} ${lastname}`;
<<<<<<< HEAD
    setUser({ email, role, name: fullName, icon });
=======
    const userData = { email, role, name: fullName, icon: iconUser };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
>>>>>>> bb8c4b32b800376c10506fe4d54d6ba9521540e1
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