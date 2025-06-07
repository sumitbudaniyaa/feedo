const Restaurant = require("../Models/restaurant");

const addItem = async (req, res) => {

  formatWords = (str) => {
    return str
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  try {
    const { restaurantId, itemName, itemPrice, itemCategory } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    const itemExists = await restaurant.menu.find(
      (item) => item.itemName.toLowerCase() === itemName.toLowerCase()
    );
    if (itemExists) {
      return res
        .status(409)
        .json({ message: "Item with this name already exists" });
    }

    const formattedName = formatWords(itemName);
    const formattedCategory = formatWords(itemCategory);

    const newItem = {
      itemName: formattedName,
      itemPrice,
      itemCategory: formattedCategory,
    };

    restaurant.menu.unshift(newItem);

    await restaurant.save();

    return res.status(200).json({ message: "Item added" });
  } catch (err) {
    return res.status(500).json({ message: "Error occured while adding item" });
  }
};

module.exports = { addItem };