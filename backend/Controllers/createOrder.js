const Order = require('../Models/order');

const createOrder = async(req,res) =>{
    try{

        const { restaurant, tableNo, items, additionalDescription } = req.body;

        const newOrder = new Order({
            restaurant,
            tableNo,
            items,
            additionalDescription
        })

        await newOrder.save();

        return res.status(200).json({message: "Order placed"})
    }

    catch(err){
      return res.status(500).json({message: "Error while placing order"})
    }
}
module.exports = { createOrder };