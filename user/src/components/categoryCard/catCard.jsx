import { useState } from 'react';
import './catCard.css'


const CatCard = ({category, isSelected, onSelect, loading }) =>{



    return(
         <div className={isSelected ? "cat-card selected" : "cat-card"} onClick={()=>onSelect(category)}>

      
           
           {loading ? <p>loading...</p> : <p>{category}</p>}
      

         </div>
    )
}

export default CatCard;