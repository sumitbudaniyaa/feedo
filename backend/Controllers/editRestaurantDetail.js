const Restaurant = require('../Models/restaurant');

const editRestaurantDetail = async(req,res) =>{

       formatWords = (str) => {
    return str
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

    try{
    const { restaurantId, name, email, address, phone } = req.body;

    const formattedName = formatWords(name);

    const restaurant = await Restaurant.findById(restaurantId);
    
    restaurant.name = formattedName;
    restaurant.email = email;
    restaurant.address = address;
    restaurant.phone = phone;

    await restaurant.save();

    return res.status(200).json({message: "Details updated"});
    }
    catch(err){
      return res.status(500).json({message: "Error while updating details"})
    }
}

module.exports = { editRestaurantDetail };