import './ordercard.css'
import axios from 'axios'

const OrderCard = ({order, fetchRestaurantDetails}) =>{

  const orderReady = async(id)=>{

    try{
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/kitchen/orderReady`,{
         orderid: id,
     });

     fetchRestaurantDetails();
    }
    catch(err){
       console.log(err.response?.data);
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

            <button onClick={()=>orderReady(order._id)}>Order Ready</button>

      </div>
    )
}

export default OrderCard;