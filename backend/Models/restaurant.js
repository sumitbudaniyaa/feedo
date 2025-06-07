const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  address: String,

  phone: {
    type: String,
    required: true,
  },

  pin: {
    type: String,
    required: true,
  },

  qr: {
    type: String,
    default: "",
  },

  menu: [
    {
      itemName: {
        type: String,
        required: true,
      },
      itemPrice: {
        type: Number,
        required: true,
      },
      itemCategory: String,
    },
  ],

});
module.exports = mongoose.model("Restaurant", restaurantSchema);