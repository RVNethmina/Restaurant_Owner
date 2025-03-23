import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import errorHandler from './utils/errorHandler.js';
import RestaurantOwnerRouter from './routes/restaurantOwnerRouter.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//api routes
app.use('/api/restaurantOwner',RestaurantOwnerRouter);


//Global error middleware
app.use(errorHandler);


//listen
app.listen(port,()=> console.log(`Server is running on port ${port}`));
