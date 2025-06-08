const Restaurant = require('../Models/restaurant');

const deleteAccount = async(req,res)=>{
    try{
        const { restaurantId } = req.body;
        const restaurant = await Restaurant.findById(restaurantId);
        await restaurant.deleteOne();

        return res.status(200).json({message: "Account deleted"});
    }
    catch(err){
        return res.status(500).json({message: "Error in deleting your account"});
    }
}

module.exports = {deleteAccount};
