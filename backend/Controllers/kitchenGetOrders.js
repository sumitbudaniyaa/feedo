const Order = require('../Models/order');
const Restaurant = require('../Models/restaurant');

const kitchenGetOrders = async(req,res) =>{

    try{
        const restaurant_id = req.restaurant.restaurantId;

         const isRestaurant = await Restaurant.findOne({_id: restaurant_id });
               if(!isRestaurant) {
                return res.status(401).json({message: "Unauthorized access"});
               }

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