import { useEffect, useState } from 'react';
import './itemcard.css'


const ItemCard = ({item, countInCart, handleAddToCart }) =>{


   
  const onAdd = countInCart > 0;

  const handleInc = () => {
    handleAddToCart(item, countInCart + 1);
  };

  const handleDesc = () => {
    if (countInCart > 1) {
      handleAddToCart(item, countInCart - 1);
    } else {
      handleAddToCart(item, 0);
    }
  };


return(
   <div className="itemcard">
       <div className="name-price">
       <h4>{item.itemName}</h4>
       <h3>₹ {item.itemPrice}</h3>
       </div>

       <div className="add">
          {onAdd ? <div className="inc-desc">
            <button className='desc' onClick={handleDesc}>-</button>
            <input type="text" className='count' value={countInCart} readOnly/>
            <button className='inc' onClick={handleInc}>+</button>
          </div> : <button className='add-btn' onClick={()=>{ handleAddToCart(item,1)}}>Add</button>} 
       </div>
   </div>
)
}

export default ItemCard;