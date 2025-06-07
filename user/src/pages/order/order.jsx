import { useEffect, useState } from "react";
import CatCard from "../../components/categoryCard/catCard";
import Header from "../../components/header/header";
import ItemCard from "../../components/itemCard/itemcard";
import "./order.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { restaurantId, tableNo } = useParams();
  const [err, seterr] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading,setloading] = useState(false);
  const [proceeding,setproceeding] = useState(false);
  const [searchterm,setsearchterm] = useState("");

  const fetchMenu = async () => {
    try {
      setloading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/fetchMenu`,
        {
          restaurantId,
        }
      );

      if (res.status === 404) {
        seterr(res.data.message);
        setloading(false);
      }

      setRestaurant(res.data.isRestaurant);

      const menuItems = res.data.isRestaurant.menu;
      const uniqueCategories = [
        "All",
        ...new Set(menuItems.map((item) => item.itemCategory)),
      ];
      setCategories(uniqueCategories);
      setloading(false);
    } catch (err) {
      seterr(err.response?.data?.message);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

const filteredMenu =
  selectedCategory === "All"
    ? restaurant?.menu?.filter((item) =>
        item.itemName.toLowerCase().includes(searchterm)
      )
    : restaurant?.menu?.filter(
        (item) =>
          item.itemCategory === selectedCategory &&
          item.itemName.toLowerCase().includes(searchterm)
      );

  const handleAddToCart = (item, count) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.itemId === item._id
    );

    if (existingItemIndex !== -1 && count === 0) {
      const updatedCart = [...cart];
      updatedCart.splice(existingItemIndex, 1);
      setCart(updatedCart);
    } else if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity = count;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          itemId: item._id,
          name: item.itemName,
          price: item.itemPrice,
          quantity: count,
        },
      ]);
    }
  };

  const handleProceed = async () => {
    try {
      setproceeding(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/setCart`,
        {
          restaurantId,
          tableNo,
          cart,
        }
      );
      setproceeding(true);
      navigate(`/${restaurantId}/${tableNo}/cart`);
    } catch (err) {
      console.log(err.response?.data?.message);
      setproceeding(true);
    }
  };

  return (
    <>

      {err ? (
        <div className="error">
          <h4>Error: {err}</h4>
        </div>
      ) : (
        <div className="order">
          {cart.length > 0 && (
            <div className="go-to-cart" onClick={handleProceed}>
              <h4>{proceeding? "loading..." : "Proceed"}</h4>
            </div>
          )}

          <Header name={restaurant ? restaurant.name : ""} />

          <input type="text" placeholder="Search food" onChange={(e)=>setsearchterm(e.target.value.toLowerCase())}/>

          <div className="category-section">
            <h4>Order by Category</h4>
            <div className="slider">
              {categories.map((cat, index) => (
                <CatCard
                  key={index}
                  category={cat}
                  isSelected={selectedCategory === cat}
                  onSelect={setSelectedCategory}
                  loading={loading}
                />
              ))}
            </div>
          </div>

          <div className="items">
            {filteredMenu?.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                countInCart={
                  cart.find((cartItem) => cartItem.itemId === item._id)
                    ?.quantity || 0
                }
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
