const Order = require('../Models/order');


const kitchenGetOrders = async(req,res) =>{

    try{
        const restaurant_id = req.restaurant.restaurantId;

        const orders = await Order.find({restaurant: restaurant_id}).sort({createdAt: -1});
        if(!orders) {
            return res.status(204).json({message: "No orders"})
        }
           else{
            return res.status(200).json({orders})
           }
       
    }

    catch(err){
return res.status(500).json({message: "Error in fetching Orders"})
    }
}

module.exports = { kitchenGetOrders };