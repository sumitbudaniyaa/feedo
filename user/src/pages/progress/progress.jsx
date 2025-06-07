import "./progress.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const Progress = () => {
  const { restaurantId, tableNo } = useParams();
  const [orderdetails, setorderdetails] = useState("");
  const navigate = useNavigate();

  const fetchOrderdetails = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/fetchOrder`,
        {
          restaurant: restaurantId,
          tableNo,
        }
      );

       if (!res.data.order || res.data.order.length === 0) {
        navigate(`/${restaurantId}`);
      } else {
        setorderdetails(res.data.order);
      }

    } catch (err) {
      console.log(err.response?.data?.message);
      navigate(`/${restaurantId}`)
    }
  };

  useEffect(() => {
    fetchOrderdetails();

     const repeatCall = setInterval(() => {
      fetchOrderdetails();
    }, 10000);

    return () => clearInterval(repeatCall);
  }, []);


  return (
    <div className="progress">

      <img src="/order.gif" alt="Order Progress" />
      <h3>Thank you for ordering!</h3>
      <h4> We're preparing your order.</h4>
      <p>Order #{orderdetails?._id?.slice(21, 24)}</p>

    </div>
  );
};

export default Progress;
