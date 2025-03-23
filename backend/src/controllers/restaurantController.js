import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import RestaurantOwnerModel from '../models/restaurantOwnerModel.js';
import {v2 as cloudinary} from 'cloudinary';


//API to add Restaurant owner
const registerRestaurantOwner = async (req,res) => {
    
    try {

        //extract data from request body
        const { name, email , password , phone , gender } = req.body;
        const imageFile = req.file;

        //Check if user already exists
        const existingUser = await RestaurantOwnerModel.findOne({ email });
        if(existingUser){
            return res.status(400).json({message:"Email already exists"});
        }
        
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //upload picture to cloudinary
        let imageUrl = null;
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(
                imageFile.path, {
                resource_type: "image",
            });
            imageUrl = imageUpload.secure_url;
        }

        //Create new user
        const newRestaurantOwner = new RestaurantOwnerModel({
            name,
            email,
            password:hashedPassword,
            phone,
            gender,
            image:imageUrl
        });

        //Save user to database
        await newRestaurantOwner.save();

        //Send response
        res.status(201).json({sucess:true,message:"Restaurant owner registered successfully",result:newRestaurantOwner});

        //send email to user

    } catch (error) {
        next(error);//Passing error to error handler
    }

};


export {
    registerRestaurantOwner,

}