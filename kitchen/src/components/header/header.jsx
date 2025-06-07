import "./header.css";
import { useNavigate, useNavigation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header>
      <h2>feedo.</h2>
      <button onClick={handleLogOut}>Log Out</button>
    </header>
  );
};

export default Header;
