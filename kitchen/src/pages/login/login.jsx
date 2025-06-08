import { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {

  const navigate = useNavigate();

  const [validPass, setvalidPass] = useState(false);
  const [loading,setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(()=>{
     if(localStorage.getItem('token')){
          navigate('/kitchen')
     }
  }, [navigate])

  const handlePasscode = (e) => {
    if (e.target.value.length > 6 || e.target.value.length == 6) {
      e.target.value = e.target.value.slice(0, 6);
      setvalidPass(true);
    } else if (e.target.value.length < 6) {
      setvalidPass(false);
    }
    setPin(e.target.value);
  };

  const handleLogin = async (e) =>{
    e.preventDefault();
    setloading(true);

    try{
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/login`,{
        email,
        pin
      });
          setEmail("");
          setPin("");

          localStorage.setItem('token', res.data.token);
          toast.success(res.data.message); 
          setloading(false);
          navigate('/kitchen');
    }

    catch(err){
         toast.error(err.response?.data?.message);
         setloading(false);
    }
  }

  return (
    <div className="login-page">
      <ToastContainer theme="dark" autoClose={3000}/>
      <div className="login-card">
        <h2>feedo.</h2>
        <h4>Enter your details to login</h4>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="example@gmail.com"
            required
            onChange={handleEmail}
            value={email}
          />
          <input
            type="tel"
            placeholder="Passcode"
            required
            onInput={handlePasscode}
            value={pin}
          />
          <code className={validPass ? "valid" : "invalid"}>
            {validPass ? "Valid Passcode Length" : "Please enter a 6 digit passcode"}
          </code>

          <button type="submit" style={loading ? { pointerEvents: 'none', opacity: '0.5', cursor: 'not-allowed' } : {}} >{loading ? "loading..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
