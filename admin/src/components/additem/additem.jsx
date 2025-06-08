import { useState } from "react";
import "./additem.css";
import { X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AddItem = ({ setadditemopen, refreshMenu, restaurant }) => {

  const [itemName, setitemName] = useState("");
  const [itemPrice, setitemPrice] = useState("");
  const [itemCategory, setitemCategory] = useState("");
  const [adding,setadding] = useState(false);
  
  const restaurantId = restaurant._id;

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      setadding(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/addItem`,
        {
          restaurantId,
          itemName,
          itemPrice,
          itemCategory,
        }
      );

      setitemName("");
      setitemPrice("");
      setitemCategory("");

      refreshMenu();
      setadding(false);
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.log(err);
      setadding(false);
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <ToastContainer theme="dark" autoClose={2000} position="bottom-right" closeOnClick={true}/>
      <div className="additem">
        <div className="additem-inputs">
          <input
            type="text"
            placeholder="Item Name"
            onChange={(e) => setitemName(e.target.value)}
            value={itemName}
            required
          />
          <input
            type="numeric"
            placeholder="Item Price"
            onChange={(e) => setitemPrice(e.target.value)}
            value={itemPrice}
            required
          />
          <input
            type="text"
            placeholder="Item Category"
            onChange={(e) => setitemCategory(e.target.value)}
            value={itemCategory}
            required
          />
        </div>

        <div className="additem-btns">
          <button type="submit" style={adding ? { pointerEvents: 'none', opacity: '0.5', cursor: 'not-allowed' } : {}}>{adding? "adding..." : "Add"}</button>
          <X className="close-btn" onClick={() => setadditemopen(false)} />
        </div>
      </div>
    </form>
  );
};

export default AddItem;
