const Restaurant = require("../Models/restaurant");

const editItem = async (req, res) => {

  formatWords = (str) => {
    return str
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  try {
    const { restaurantId, itemId, itemName, itemPrice, itemCategory } =
      req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    const item = restaurant.menu.id(itemId);

    const sameName = await restaurant.menu.find((item) => item.itemName.toLowerCase() === itemName.toLowerCase() && item._id != itemId);
    if(sameName){
      return res.status(409).json({message: "Item with this name exists."})
    }

    const formattedName = formatWords(itemName);
    const formattedCategory = formatWords(itemCategory);

    item.itemName = formattedName;
    item.itemPrice = itemPrice;
    item.itemCategory = formattedCategory;

    await restaurant.save();

    return res.status(200).json({ message: "Item updated" });
  } catch (err) {
    return res.status(500).json({ message: "Error in updating item." });
  }
};

module.exports = { editItem };