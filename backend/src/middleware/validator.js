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

//Schema for Add Restaurant
const addRestaurantSchema = Joi.object({
    ownerId: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.string().required(),

    "address.line1": Joi.string().required(),
    "address.line2": Joi.string().optional(),
    "address.city": Joi.string().required(),
    "address.state": Joi.string().required(),
    "address.zipCode": Joi.string().required(),

    phone: Joi.string().required(),
    email: Joi.string().email().required(),
});

//Schema for Update Restaurant
const updateRestaurantSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),

    "address.line1": Joi.string().required(),
    "address.line2": Joi.string().optional(),
    "address.city": Joi.string().required(),
    "address.state": Joi.string().required(),
    "address.zipCode": Joi.string().required(),

    phone: Joi.string().required(),
    email: Joi.string().email().required(),
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


//API to validate add restaurant
const validateAddRestaurantBody = (schema) => {
    return (req,res,next) => {
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({error:error.details[0].message});
        }
        next();
    };
}

//API to validate update restaurant
const validateUpdateRestaurantBody = (schema) => {
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
    validateLoginBody,
    addRestaurantSchema,
    validateAddRestaurantBody,
    updateRestaurantSchema,
    validateUpdateRestaurantBody
}