import Joi from "joi"
import { Schema } from "mongoose";

// Schema for Registration
const registrationSchema = Joi.object({
    
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.number().required(),
    gender: Joi.string().valid("Male","Female").optional(),
    profilePicture: Joi.string().optional()
});



//API to validate registration
const validateRegistrationBody = (Schema) => {
    return (req, res, next) => {
        const { error } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
}

export {
    validateRegistrationBody,
}