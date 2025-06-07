const Order = require("../Models/order");

const orderReady = async (req, res) => {
  try {
    const { orderid } = req.body;

    const order = await Order.findById(orderid);

    await order.deleteOne();

    return res.status(200).json({ message: "Order ready" });
  } catch (err) {
    return res.status(500).json({ message: "Error" });
  }
};

module.exports = { orderReady };