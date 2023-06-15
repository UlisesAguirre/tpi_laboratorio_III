import React, { useContext } from "react";
import ListUser from "./ListUser/ListUser";
import UserContext from "../Context/UserContext";

import "./listUserContainer.css";
import Main from "../MainContainer/Main/Main";

const ListUserContainer = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="client-container">
      <Main />
      <div className="list-user-container">
        {user.role === "admin" ? (
          <ListUser typeUser={"clients"} />
        ) : (
          <ListUser typeUser={"users"} />
        )}
      </div>
    </div>
  );
};

export default ListUserContainer;
