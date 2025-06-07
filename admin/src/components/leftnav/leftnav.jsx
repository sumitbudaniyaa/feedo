import { useState } from 'react';
import './leftnav.css'
import { useNavigate  } from 'react-router-dom';

const Nav = () =>{

    const [isselected,setisselected] = useState("Home");
    const navigate = useNavigate();

    const handleLogOut = () =>{
      localStorage.removeItem('token');
      navigate('/');
    }

    return(
          <div className="nav">      <ul>
                <li onClick={() => {setisselected("Home"), navigate('/dashboard/home')}} className={isselected == "Home" ? "selected" : ""} >Home</li>
             
                <li onClick={() => {setisselected("QR"), navigate('/dashboard/qr-code')}} className={isselected == "QR" ? "selected" : ""} >QR Code</li>

                   <li onClick={() => {setisselected("My Account"), navigate('/dashboard/my-account')}} className={isselected == "My Account" ? "selected" : ""} >My Account</li>
              </ul>

              <button onClick={handleLogOut}>Log Out</button>
          
          </div>
    )
}

export default Nav;