const Cart = require("../Models/cart");

const cartItems = async (req, res) => {
  try {
    const { restaurantId, cart, tableNo } = req.body;

    let existingCart = await Cart.findOne({
      tableNo,
      restaurant: restaurantId,
    });

    const cartData = {
      restaurant: restaurantId,
      tableNo: Number(tableNo),
      items: cart.map(({ itemId, name, price, quantity }) => ({
        _id: itemId,
        itemName: name,
        itemPrice: price,
        itemQuantity: quantity,
      })),
    };

    if (existingCart) {
      existingCart.items = cartData.items;
      await existingCart.save();
    } else {
      const newCart = new Cart(cartData);
      await newCart.save();
    }

    res.status(200).json({ message: "Items added to cart" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error while adding items to cart" });
  }
};

module.exports = { cartItems };