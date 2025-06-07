const Restaurant = require("../Models/restaurant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const loginRestaurant = async (req, res) => {
  try {
    const { email, pin } = req.body;

    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant does not exist." });

    const pinMatch = await bcrypt.compare(pin, restaurant.pin);
    if (!pinMatch) 
        return res.status(401).json({ message: "Invalid Passcode" });

    const token = jwt.sign(
      { 
        restaurantId: restaurant._id,
        name: restaurant.name,
      },
      JWT_SECRET
    );

   return res.status(200).json({
      message: "Logged In",
      token,
    });
  } catch (err) {
   return res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { loginRestaurant };