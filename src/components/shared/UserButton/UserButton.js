import { Link } from "react-router-dom";
import "./userButton.css"

const UserButton = ({ to, buttonName }) => {
  return (
    <div>
      <Link to={to}>
        <button className="button">{buttonName}</button>
      </Link>
    </div>
  );
};

export default UserButton;
