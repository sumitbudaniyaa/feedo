const Restaurant = require('../Models/restaurant');


const getMenuDashboard = async (req,res) =>{

    try{
       const restaurant_id = req.restaurant.restaurantId;

       const isRestaurant = await Restaurant.findOne({_id: restaurant_id });
       if(!isRestaurant) {
        return res.status(401).json({message: "Unauthorized access"});
       }
      return res.status(200).json({isRestaurant});
    }
    catch(err){
       return res.status(500).json({message: "Error occurred in server"});
    }
}

module.exports = { getMenuDashboard }; 