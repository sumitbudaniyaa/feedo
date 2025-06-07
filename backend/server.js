const express = require('express')
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());app.use(express.json());
app.use(cors());app.use(cors());


const restaurantRouter = require('./Routes/restaurantRouter');
const dashboardRouter = require('./Routes/dashboardRouter');
const userAppRouter = require('./Routes/userAppRouter')
const kitchenRouter = require('./Routes/kitchenRouter');

connectDB();

app.use('/api/restaurant', restaurantRouter);app.use('/api/restaurant', restaurantRouter);
app.use('/api/dashboard', dashboardRouter);app.use('/api/dashboard', dashboardRouter);
app.use('/api/user', userAppRouter);app.use('/api/user', userAppRouter);
app.use('/api/kitchen', kitchenRouter);app.use('/api/kitchen', kitchenRouter);

app.listen(PORT ,()=>{app.listen(PORT ,()=>{
    console.log(`server running on port ${PORT}`)
})
})