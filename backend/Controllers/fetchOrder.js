const Order = require('../Models/order');

const fetchOrder = async (req,res) =>{
    try{


        const { restaurant,tableNo } = req.body; 
        
        const order = await Order.findOne({
            restaurant,
            tableNo
        }).sort({createdAt: -1})

        return res.status(200).json({order});
    }

    catch(err){
     return res.status(500).json({message: "Error in fetching order details"})
    }
}

module.exports = { fetchOrder };