import { useState } from 'react';
import './catCard.css'


const CatCard = ({category, isSelected, onSelect }) =>{



    return(
         <div className={isSelected ? "cat-card selected" : "cat-card"} onClick={()=>onSelect(category)}>

      
           
           <p>{category}</p>
      

         </div>
    )
}

export default CatCard;