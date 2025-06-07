import { useEffect } from "react";
import "./cart.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Cart = () => {
  const { restaurantId,tableNo } = useParams();
  const [items, setitems] = useState([]);
  const navigate = useNavigate();
  const [additionalDescription, setadditionalDescription] = useState("");
  const [loading,setloading] = useState(false);

  const subTotal = items?.reduce((total, item) => {
    return total + item.itemPrice * item.itemQuantity;
  }, 0);

  const taxes = 50;

  const grandTotal = subTotal + taxes;

  const fetchCart = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/fetchCart`,
        {
          restaurantId,
          tableNo
        }
      );

      setitems(res.data.items);
    } catch (err) {
      console.log(err);
      navigate(`/${restaurantId}`);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [restaurantId,tableNo]);

  const handlePlaceOrder = async() =>{
    try{
      setloading(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/createOrder`,{
        restaurant: restaurantId, 
        tableNo,
        items,
        additionalDescription
      });

      setloading(false);
      navigate(`/${restaurantId}/${tableNo}/progress`);
    }
    catch(err){
       console.log(err.response?.data?.message);
       setloading(false);
    }
  }

  return (
    <div className="cart">
      <h3>Order summary</h3>

      <div className="bill">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>x {item.itemQuantity}</td>
                <td>₹ {item.itemPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>
        Sub Total <p>₹ {subTotal}</p>
      </h4>
      <span>
        Taxes & Charges <p>₹ {taxes}</p>
      </span>

      <h2>
        Grant total <p>₹ {grandTotal}</p>
      </h2>

      <textarea
        name="anythingextra"
        id="specification"
        placeholder="Any instructions"
        value={additionalDescription}
        onChange={(e)=>setadditionalDescription(e.target.value)}
      ></textarea>

      <div className="pay-btns">
        <button className="paynow" onClick={handlePlaceOrder}>{loading ? "loading..." : "Place Order"}</button>
      </div>
    </div>
  );
};

export default Cart;
