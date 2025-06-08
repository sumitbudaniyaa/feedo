const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },

  tableNo: {
    type: Number,
    required: true,
    unique: true,
  },
  items: [
    {
      itemName: String,
      itemPrice: Number,
      itemQuantity: Number,
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

CartSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

module.exports = new mongoose.model("Cart", CartSchema);