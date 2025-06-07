const QRcode  = require('qrcode');
const Restaurant = require('../Models/restaurant');
require('dotenv').config();

const generateQR = async (id) => {

    try{
      const url = `${process.env.FRONTEND_URL}${id.toString()}`;

      const restaurant = await Restaurant.findById(id);

      const qrImage = await QRcode.toDataURL(url);

      restaurant.qr = qrImage;
      await restaurant.save(); 
    }

    catch(err){
     throw err;
    }
}

module.exports = { generateQR };