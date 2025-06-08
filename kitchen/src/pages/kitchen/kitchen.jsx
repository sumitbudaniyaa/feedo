import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import OrderCard from "../../components/ordercard/ordercard";
import "./kitchen.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Kitchen = () => {
  const token = localStorage.getItem("token");
  const [orders, setorders] = useState(null);
  const navigate = useNavigate();


  const fetchRestaurantDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/kitchen/kitchenGetOrders`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setorders(res.data.orders);
    } catch (err) {
      toast.error(err.response?.data?.message);
      localStorage.removeItem('token');
      navigate('/')
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchRestaurantDetails();

    const repeatCall = setInterval(() => {
      fetchRestaurantDetails();
    }, 10000);

    return () => clearInterval(repeatCall);
  }, [token]);

  return (
    <div className="kitchen">
      <ToastContainer theme="dark" autoClose={3000} />
      <Header />

      {orders?.length === 0 ? (
        <div className="no-orders">
          <h1>No orders yet</h1>
        </div>
      ) : (
        ""
      )}

      <div className="order-window">
        {orders?.map((order) => (
          <OrderCard key={order._id} order={order} fetchRestaurantDetails={fetchRestaurantDetails}/>
        ))}
      </div>
    </div>
  );
};

export default Kitchen;
