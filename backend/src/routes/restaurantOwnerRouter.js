import express from 'express';
import { deleteRestaurantOwner, loginRestaurantOwner, registerRestaurantOwner, updateRestaurantOwnerProfile, viewRestaurantOwnerProfile } from '../controllers/restaurantController.js';
import { loginSchema, registrationSchema, validateLoginBody, validateRegistrationBody } from '../middleware/validator.js';
import upload from '../middleware/multer.js';
import authResOwner from '../middleware/authResOwner.js';

const RestaurantOwnerRouter = express.Router();

RestaurantOwnerRouter.post("/register-restaurant-owner",upload.single("profilePicture"),validateRegistrationBody(registrationSchema),registerRestaurantOwner);
RestaurantOwnerRouter.post("/login-restaurant-owner",validateLoginBody(loginSchema),loginRestaurantOwner);

RestaurantOwnerRouter.get("/get-owner-profile/:id",authResOwner,viewRestaurantOwnerProfile);
RestaurantOwnerRouter.patch("/update-owner-profile",upload.single("profilePicture"),authResOwner,updateRestaurantOwnerProfile);
RestaurantOwnerRouter.delete("/delete-owner-profile/:id",authResOwner,deleteRestaurantOwner);

export default RestaurantOwnerRouter;