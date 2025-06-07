const mongoose = require("mongoose");

const Order = new mongoose.Schema({

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },

  tableNo: {
    type: Number,
    required: true,
  },

  items: [
    {
      itemName: String,
      itemPrice: Number,
      itemQuantity: Number,
    },
  ],

  additionalDescription:{
    type: String
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = new mongoose.model("Order", Order);