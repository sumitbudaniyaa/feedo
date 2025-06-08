import "./myacc.css";
import { Pencil } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAcc = () => {
  const { restaurant, refreshMenu } = useOutletContext();
  const [arrdown, setarrdown] = useState(false);
  const [detailedit, setdetailedit] = useState(false);
  const navigate = useNavigate();
  const [saving, setsaving] = useState(false);
  const [deleting, setdeleting] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    setName(restaurant?.name);
    setEmail(restaurant?.email);
    setAddress(restaurant?.address);
    setPhone(restaurant?.phone);
  }, [restaurant]);

  const handleSave = async () => {
    if (name === "" || email === "" || address === "" || phone === "") {
      toast.error("Value cannot be empty");
    } else {
      try {
        setsaving(true);
        const res = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/restaurant/editRestaurantDetail`,
          {
            restaurantId: restaurant._id,
            name: name,
            email: email,
            address: address,
            phone: phone,
          }
        );

        refreshMenu();
        setsaving(false);
        setdetailedit(false);
      } catch (err) {
        toast.error(err.response?.data?.message);
        setsaving(false);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setdeleting(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/deleteAccount`,
        {
          restaurantId: restaurant._id,
        }
      );

      if (res.status === 200) {
        setdeleting(false);
        localStorage.removeItem("token");
        refreshMenu();
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      setdeleting(false);
    }
  };

  return (
    <div className="myacc">
      <ToastContainer theme="dark" autoClose={2000} position="bottom-right" />
      <div className="myaccheader">
        <h2>My Account</h2>
      </div>

      <div className="details">
        {detailedit ? (
          <button
            onClick={() => {
              handleSave();
            }}
          >
            {saving ? "saving..." : "Save"}
          </button>
        ) : (
          <button onClick={() => setdetailedit(true)}>
            <Pencil size={"1.25rem"} />
          </button>
        )}

        {detailedit ? (
          <>
            <p>
              <strong>Restaurant Name</strong>{" "}
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <p>
              <strong>Email</strong>{" "}
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            <p>
              <strong>Address</strong>{" "}
              <input
                type="text"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </p>
            <p>
              <strong>Phone</strong>{" "}
              <input
                type="tel"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Restaurant Name</strong> {name}
            </p>
            <p>
              <strong>Email</strong>
              {email}
            </p>
            <p>
              <strong>Address</strong> {address}
            </p>
            <p>
              <strong>Phone</strong> {phone}
            </p>
          </>
        )}
      </div>

      <div className={arrdown ? "acc-deletion active" : "acc-deletion"}>
        <h3 onClick={() => setarrdown(!arrdown)}>
          Account Deletion{" "}
          <span>{arrdown ? <ChevronUp /> : <ChevronDown />}</span>
        </h3>

        <div className="warning">
          <p>
            You are about to delete your account. This action is irreversible.
          </p>
          <p>
            All your data, including menus and QR codes will be permanently
            deleted.
          </p>
          <p>
            You will no longer be able to access your account or recover any
            associated data.
          </p>
        </div>

        <button onClick={handleDeleteAccount}>
          {deleting ? "deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default MyAcc;
