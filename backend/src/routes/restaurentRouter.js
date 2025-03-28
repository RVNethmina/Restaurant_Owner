import express from 'express';
import { addRestaurant, deleteRestaurant, updateRestaurantOwnerProfile, viewRestaurant } from '../controllers/restaurantController.js';
import { addRestaurantSchema, updateRestaurantSchema, validateAddRestaurantBody, validateUpdateRestaurantBody } from '../middleware/validator.js';
import upload from '../middleware/multer.js';

const restaurantRouter = express.Router();

restaurantRouter.post("/add-restaurant",upload.single('image'),validateAddRestaurantBody(addRestaurantSchema),addRestaurant);
restaurantRouter.patch("/update-restaurant/:id",upload.single('image'),validateUpdateRestaurantBody(updateRestaurantSchema),updateRestaurantOwnerProfile);
restaurantRouter.delete("/delete-restaurant/:id",deleteRestaurant);
restaurantRouter.get("/get-restaurant/:id",viewRestaurant);


export default restaurantRouter;