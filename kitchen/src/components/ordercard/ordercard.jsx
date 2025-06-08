import { useState } from 'react';
import './ordercard.css'
import axios from 'axios'

const OrderCard = ({order, fetchRestaurantDetails}) =>{

    const [loading,setloading] = useState(false);

  const orderReady = async(id)=>{

    try{
      setloading(true);

     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/kitchen/orderReady`,{
         orderid: id,
     });

     fetchRestaurantDetails();
     setloading(false);
    }
    catch(err){
       console.log(err.response?.data);
       setloading(false);
    }
  }

    return(
      <div className="ordercard">
        <span>Order #{order?._id?.slice(21, 24)}</span>
            <h2>{order.tableNo}</h2>

            {order.items?.map(item=>(
              <p key={item._id}>{item.itemName} <span>x {item.itemQuantity}</span></p>
            ))}
            
            <span className='instruction-label'>Instructions </span>
            <p>{order.additionalDescription}</p>

            <button onClick={()=>orderReady(order._id)} style={loading ? { pointerEvents: 'none', opacity: '0.5', cursor: 'not-allowed' } : {}}>{loading ? "loading..." : "Order Ready"}</button>

      </div>
    )
}

export default OrderCard;