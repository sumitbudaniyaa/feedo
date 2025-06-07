import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";
import Nav from "../../components/leftnav/leftnav";
import "./dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

   const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/menu`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      
        setRestaurant(res.data.isRestaurant);
      } catch (err) {
        toast.error(err.response?.data?.message);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

  useEffect(() => {
    if(!token) {
        navigate('/');
    }
    fetchMenu();
  }, [token]);

  return (
    <div className="dashboard">
      <Header name={restaurant ? restaurant.name : ""} />
      <div className="content">
          <ToastContainer theme="dark" autoClose={2000} position="bottom-right" />
        <Nav />
        <Outlet context={{ restaurant, refreshMenu: fetchMenu }} />
      </div>
    </div>
  );
};

export default Dashboard;
