const Restaurant = require("../Models/restaurant");

const fetchMenu = async (req, res) => {
  try {
    const { restaurantId } = req.body;

    const isRestaurant = await Restaurant.findById(restaurantId);

    

    if (!isRestaurant) {
      return res.status(404).json({ message: "Invalid Restaurant" });
    }

    res.status(200).json({ isRestaurant });
  } catch (err) {
    return res.status(500).json({ message: "Error occured in server" });
  }
};

module.exports = { fetchMenu };