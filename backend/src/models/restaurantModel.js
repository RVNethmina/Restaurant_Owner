import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantOwner", 
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category:{
        type: String,
        required: true,
    },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    phone: {
      type: String, 
      required: true,
    },
    email:{
        type: String,
        required: true, 
    },
    image:{
        type:String
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);

export default RestaurantModel;
