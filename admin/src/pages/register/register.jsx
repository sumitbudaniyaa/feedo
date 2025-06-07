import { useEffect, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard/home");
    }
  }, [navigate]);

  const [validPass, setvalidPass] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlePasscode = (e) => {
    if (e.target.value.length > 6 || e.target.value.length == 6) {
      e.target.value = e.target.value.slice(0, 6);
      setvalidPass(true);
    } else if (e.target.value.length < 6) {
      setvalidPass(false);
    }
    setPin(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      if (pin.length === 6 && phone.length === 10) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/register`,
          {
            name,
            email,
            address,
            phone,
            pin,
          }
        );

        setName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setPin("");


        toast.success(res.data.message);
        setloading(false);
        navigate("/");
      } else if (phone.length < 10) {
        toast.error("Please enter 10 digit phone number");
      } else if (pin.length < 6) {
        toast.error("Please set a 6 digit Passcode");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
         setloading(false);
    }
  };

  return (
    <div className="register-page">
      <ToastContainer theme="dark" autoClose={3000} />
      <div className="register-card">
        <h2>feedo.</h2>
        <h4>Enter your details to register</h4>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name of Restaurant"
            required
            onChange={handleName}
            value={name}
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            required
            onChange={handleEmail}
            value={email}
          />
          <input
            type="text"
            placeholder="Restaurant Address"
            required
            onChange={handleAddress}
            value={address}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            onChange={handlePhone}
            value={phone}
          />
          <input
            className="pin"
            type="numeric"
            placeholder="Passcode"
            required
            onInput={handlePasscode}
            value={pin}
          />
          <code className={validPass ? "valid" : "invalid"}>
            {validPass
              ? "Valid Passcode Length"
              : "Please enter a 6 digit passcode"}
          </code>

          <span>
            *Passcode is a key set by you that will be required to access your
            account.
          </span>

          <p onClick={() => navigate("/")} className="already-user">
            Already a user? LogIn
          </p>

          <button type="submit">
            {loading ? "loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
