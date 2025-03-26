import jwt from 'jsonwebtoken'

//restaurant owner authentication middleware

const authResOwner = async (req,res,next) => {
    try {

        const {resToken} = req.headers.resToken
        
        if(!resToken){
            return res.json({success:false, message:"Not Authorised, Login again!"})
        }
        const  token_decode = jwt.verify(resToken,process.env.JWT_SECRET)

        //get user id from the token
        req.body.userId = token_decode.id

        next()
        
    } catch (error) {
       next(error);
    }
}

export default authResOwner;