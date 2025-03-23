import express from 'express';
import { registerRestaurantOwner } from '../controllers/restaurantController.js';
import { validateRegistrationBody } from '../middleware/validator.js';
import upload from '../middleware/multer.js';

const RestaurantOwnerRouter = express.Router();

RestaurantOwnerRouter.post("/register-restaurant-owner",upload.single("image"),validateRegistrationBody,registerRestaurantOwner);

export default RestaurantOwnerRouter;