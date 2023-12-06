const jwt = require ('jsonwebtoken');
const user = require('../model/user');

const userMiddleware  = async (req,res,next)=>{
    // get toekn from the request header 
    const token = req.header ('Authorization');

    //check if token is present or not 
    if(!token){
        return res.status(401).json({error:'Unauthorised -No token provided '});

    }
    try {
        const decoded = jwt.verify(token,'hostel management service is tokenised ');
        console.log ('Decode token',decoded);

        // found the user based on decoded jwt token 
        const foundUser = await user.findById(decoded.adminId);

        if(!foundUser){
            return res.status(401).json({error:'Unauthorised -Invalid token, not founduser '});
        }

        // set the user details in the req object 
        
        req.user= foundUser;
        // proceed t next miidleware or route handler

        next ();

    } catch (error) {
        console.error('Token Verification error :',error);
        return res.status(401).json({error:'Unauthorised invalid token '});
    }
} ;

module.exports= userMiddleware;