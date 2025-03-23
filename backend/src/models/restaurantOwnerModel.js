import mongoose from "mongoose";

const RestaurantOwnerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        gender:{
            type:String,
            enum:["Male","Female"],
            default:"Male"
        },
        imahge:{
            type:String,
        },
    },
    { timestamps: true }
);

const RestaurantOwnerModel = mongoose.model("RestaurantOwnerModel",RestaurantOwnerSchema);


export default RestaurantOwnerModel;