import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import RestaurantOwnerModel from '../models/restaurantOwnerModel.js';
import {v2 as cloudinary} from 'cloudinary';
import RestaurantModel from '../models/restaurantModel.js';



//API to add Restaurant owner
const registerRestaurantOwner = async (req,res,next) => {
    
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
            profilePicture:imageUrl
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


//API to login restaurant owner
const loginRestaurantOwner = async (req,res,next) => {

    try 
    {
        
        const { email , password } = req.body;

        //Check if user exists
        const existingUser = await RestaurantOwnerModel.findOne({ email });
        if(!existingUser){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //Generate token
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:"1d"});

        //Send response
        res.status(200).json({sucess:true,result:existingUser,token});

    } catch (error) {
        next(error);
    }
};


//API to view Restaurant Owner Profile
const viewRestaurantOwnerProfile = async (req,res,next) => {

    try {
        
        const { id } = req.params;

        // Check if user exists
        const restaurantOwner = await RestaurantOwnerModel.findById(id);
        if (!restaurantOwner) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Send response
        res.status(200).json({ success: true, data: restaurantOwner });

    } catch (error) {
        next(error);
    }
    
};

//update restaurant owner profile
const updateRestaurantOwnerProfile = async (req,res,next) => {

    try {

        const { name , email , password , phone ,gender } = req.body;
        const { imageFile } = req.file;

        //Check if user exists
        const existingUser = await RestaurantOwnerModel.findOne({ email });
        if(!existingUser){
            return res.status(400).json({message:"Invalid credentials"});
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

        const updateOwner = {
            name,
            email,
            password:hashedPassword,
            phone,
            gender,
            profilePicture:imageUrl
        }

        //Update user
        const updatedUser = await RestaurantOwnerModel.findByIdAndUpdate(existingUser._id,updateOwner,{new:true});

        //Send response
        res.status(200).json({sucess:true,message:"Restaurant owner updated successfully",result:updatedUser});


    } catch (error) {
        next(error);
    }

};


//API to delete restaurant owner
const deleteRestaurantOwner = async (req,res,next) => {

    try {
        
        const { id } = req.params;

        //Check if user exists
        const existingUser = await RestaurantOwnerModel.findById(id);
        if(!existingUser){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //Delete user
        await RestaurantOwnerModel.findByIdAndDelete(id);

        //Send response
        res.status(200).json({sucess:true,message:"Restaurant owner deleted successfully"});

    } catch (error) {
        next(error);
    }
};


//API to create a restaurant
const addRestaurant = async (req, res, next) => {
    try {
        const {
            ownerId,
            name,
            category,
            phone,
            email,
            "address.line1": line1,
            "address.line2": line2,
            "address.city": city,
            "address.state": state,
            "address.zipCode": zipCode
        } = req.body;

        const imageFile = req.file;

        // Check if owner exists
        const existingUser = await RestaurantOwnerModel.findById(ownerId);
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Restaurant owner doesn't exist" });
        }

        // Upload image to Cloudinary
        let imageUrl = null;
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        }

        // Construct address object
        const address = {
            line1: line1 || "",
            line2: line2 || "",
            city: city || "",
            state: state || "",
            zipCode: zipCode || ""
        };

        // Create new restaurant entry
        const newRestaurant = new RestaurantModel({
            ownerId,
            name,
            category,
            address,
            phone,
            email,
            image: imageUrl
        });

        await newRestaurant.save();

        res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            restaurant: newRestaurant
        });

    } catch (error) {
        next(error);
    }
};


//API to update restaurant
const updateRestaurant = async (req,res,next) => {

    try {
        
        const { id } = req.params;
        const {
            name,
            category,
            phone,
            email,
            "address.line1": line1,
            "address.line2": line2,
            "address.city": city,
            "address.state": state,
            "address.zipCode": zipCode
        } = req.body;

        const imageFile = req.file;

        //Check if restaurant exists
        const existingRestaurant = await RestaurantModel.findById(id);
        if(!existingRestaurant){
            return res.status(400).json({message:"Restaurant doesn't exist"});
        }

        //Upload image to cloudinary
        let imageUrl = null;
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
            imageUrl = imageUpload.secure_url;
        }

         // Construct address object
         const address = {
            line1: line1 || "",
            line2: line2 || "",
            city: city || "",
            state: state || "",
            zipCode: zipCode || ""
        };

        //Update restaurant
        const updateRestaurant = {
            name,
            category,
            address,
            phone,
            email,
            image: imageUrl
        }

        const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(id,updateRestaurant,{new:true});

        //Send response
        res.status(200).json({sucess:true,message:"Restaurant updated successfully",result:updatedRestaurant});

    } catch (error) {
        next(error);
    }
};

//API to delete restaurant
const deleteRestaurant = async (req,res,next) => {

    try {
        
        const { id } = req.params;

        //Check if restaurant exists
        const existingRestaurant = await RestaurantModel.findById(id);
        if(!existingRestaurant){
            return res.status(400).json({message:"Restaurant doesn't exist"});
        }

        //Delete restaurant
        await RestaurantModel.findByIdAndDelete(id);

        //Send response
        res.status(200).json({sucess:true,message:"Restaurant deleted successfully"});

    } catch (error) {
        next(error);
    }
};


//API to view restaurant
const viewRestaurant = async (req,res,next) => {

    try {
        
        const { id } = req.params;

        //Check if restaurant exists
        const existingRestaurant = await RestaurantModel.findById(id);
        if(!existingRestaurant){
            return res.status(400).json({message:"Restaurant doesn't exist"});
        }

        //Send response
        res.status(200).json({sucess:true,result:existingRestaurant});

    } catch (error) {
        next(error);
    }
};



export {
    registerRestaurantOwner,
    loginRestaurantOwner,
    viewRestaurantOwnerProfile,
    updateRestaurantOwnerProfile,
    deleteRestaurantOwner,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    viewRestaurant
}