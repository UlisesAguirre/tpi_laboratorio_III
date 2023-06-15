import { useContext } from "react";
import UserContext from "../Context/UserContext";
import Main from "./Main/Main";

import "./mainContainer.css";

const MainContainer = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div className="client-container">
      <Main />
    </div>
  );
};

export default MainContainer;
