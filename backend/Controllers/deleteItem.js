const Restaurant = require('../Models/restaurant');


const deleteItem = async (req,res) =>{

    try{
        const { restaurantId , itemId } = req.body;

        const restaurant = await Restaurant.findById(restaurantId);

        const item = restaurant.menu.id( itemId );

        item.deleteOne();

        await restaurant.save();

        return  res.status(200).json({ message: 'Item deleted successfully'});
    }
    catch(err){
       return res.status(500).json({message: "Error in deleting item"});
    }
}


module.exports = { deleteItem }