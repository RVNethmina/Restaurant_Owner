import Joi from "joi"

// Schema for Registration
const registrationSchema = Joi.object({
    
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.number().required(),
    gender: Joi.string().valid("Male","Female").optional(),
    profilePicture: Joi.string().optional()
});

//Schema for Login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});


//API to validate registration
const validateRegistrationBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
}

//API to validate login
const validateLoginBody = (schema) => {
    return (req,res,next) => {
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({error:error.details[0].message});
        }
        next();       
    };
}


export {
    registrationSchema,
    validateRegistrationBody,
    loginSchema,
    validateLoginBody
}