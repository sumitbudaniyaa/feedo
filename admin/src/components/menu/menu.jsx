import "./menu.css";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AddItem from "../additem/additem";
import { useState } from "react";

const Menu = () => {
  const { restaurant, refreshMenu } = useOutletContext();
  const [isedititemId, setisedititemId] = useState(null);
  const [additemopen, setadditemopen] = useState(false);
  const [saving, setsaving] = useState(false);
  const [deleting, setdeleting] = useState(false);
  const [itemName, setitemName] = useState("");
  const [itemPrice, setitemPrice] = useState("");
  const [itemCategory, setitemCategory] = useState("");

  const handleDelete = async (id) => {
    try {
      setdeleting(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/deleteItem`,
        {
          data: {
            restaurantId: restaurant._id,
            itemId: id,
          },
        }
      );
      refreshMenu();
      setdeleting(false);
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.log(err);
      setdeleting(false);
    }
  };

  const handleSave = async (id) => {
    try {
      setsaving(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/dashboard/editItem`,
        {
          restaurantId: restaurant._id,
          itemId: id,
          itemName,
          itemPrice,
          itemCategory,
        }
      );

      setisedititemId(null);
      refreshMenu();
      setsaving(false);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  if (!restaurant || !restaurant.menu) {
    return (
      <div className="menu">
        <h2>Loading menu...</h2>
      </div>
    );
  }

  const isMenuEmpty = restaurant.menu.length === 0;

  return (
    <div className="menu">
      <ToastContainer theme="dark" autoClose={2000} position="bottom-right" />
      <div className="menuheader">
        <h2>Menu</h2>
        <button onClick={() => setadditemopen(!additemopen)}>Add Item</button>
      </div>

      {additemopen ? (
        <AddItem
          setadditemopen={setadditemopen}
          refreshMenu={refreshMenu}
          restaurant={restaurant}
        />
      ) : (
        ""
      )}

      {isMenuEmpty ? (
        <div className="empty-menu">
          <h1>Menu is empty</h1>
        </div>
      ) : (
        <>
          <div className="menubox">
            {restaurant.menu.map((item) => (
              <div className="menucard" key={item._id}>
                <>
                  <h3>
                    {isedititemId === item._id ? (
                      <>
                        <form onSubmit={handleSave}>
                          <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setitemName(e.target.value)}
                          />
                          <p>
                            ₹{" "}
                            <input
                              type="numeric"
                              value={itemPrice}
                              onChange={(e) => setitemPrice(e.target.value)}
                            />
                          </p>
                          <p>
                            Category:{" "}
                            <input
                              type="text"
                              value={itemCategory}
                              onChange={(e) => setitemCategory(e.target.value)}
                            />
                          </p>
                        </form>
                      </>
                    ) : (
                      <>
                        {item.itemName}
                        <p>₹ {item.itemPrice}</p>
                      </>
                    )}
                  </h3>
                  <div className="menucard-btns">
                    {isedititemId === item._id ? (
                      <button
                        type="submit"
                        className={saving ? "save saving" : "save"}
                        style={saving ? { pointerEvents: 'none', opacity: '0.5', cursor: 'not-allowed' } : {}}
                        onClick={() => handleSave(item._id)}
                      >
                        {saving ? "saving..." : "Save"}
                      </button>
                    ) : (
                      <button
                        className="edit"
                        onClick={() => {
                          setisedititemId(item._id);
                          setitemName(item.itemName);
                          setitemPrice(item.itemPrice);
                          setitemCategory(item.itemCategory);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className={deleting ?  "del deleting" : ""}
                      onClick={() => handleDelete(item._id)}
                    >
                      {deleting ? "deleting..." : "Delete"}
                    </button>
                  </div>
                </>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
