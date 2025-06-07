const Cart = require("../Models/cart");

const fetchCart = async (req, res) => {
  try {
    const { restaurantId,tableNo } = req.body;

    const cart = await Cart.findOne({  restaurant: restaurantId,
      tableNo: Number(tableNo)});

    const items = cart.items;

    return res.status(200).json({ items });
  } catch (err) {
    return res.status(500).json({ message: "Error while loading cart" });
  }
};

module.exports = { fetchCart };