import { useNavigate } from "react-router-dom";
import "./Dashboardheader.css";

const Dashboardheader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };
  return (
    <div className="header-container">
      <div></div>
      <div>LOGO</div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboardheader;
