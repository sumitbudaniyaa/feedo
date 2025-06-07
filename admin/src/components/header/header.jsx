import './header.css'
import { User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Header = ({name}) =>{

       const navigate = useNavigate();

    return(
   <header>
      <h2>feedo.</h2>
      
      <h3> <User /> {name}</h3>

      
   </header>
    )
}

export default Header;