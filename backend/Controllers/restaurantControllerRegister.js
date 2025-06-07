const Restaurant = require("../Models/restaurant");
const { generateQR } = require("../Controllers/generateQR");
const bcrypt = require("bcrypt");
const { sendWelcomeMail } = require("../utils/mailer");

const registerRestaurant = async (req, res) => {
  formatWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  try {
    const { name, email, address, phone, pin } = req.body;

    const formattedName = formatWords(name);

    const exists = await Restaurant.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "User exists with this email." });

    const hashedPin = await bcrypt.hash(pin, 10);

    const newRestaurant = new Restaurant({
      name: formattedName,
      email,
      address,
      phone,
      pin: hashedPin,
    });

    await newRestaurant.save();

    await generateQR(newRestaurant._id);

    sendWelcomeMail({ to: email, name: formattedName }).catch(console.error);

    return res.status(201).json({ message: "Registered Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error occured while registering" });
  }
};

module.exports = { registerRestaurant };
