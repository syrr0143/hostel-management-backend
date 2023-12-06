const express = require('express');
const User = require ('../model/user')
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();
router.get ('/allUsers',adminMiddleware,async (req,res)=>{
try {
    const users = await User.find();

    // exclude the sensitive details like password as if required 

    const sanitizedUser = users.map(user =>({
        FullName: user.FullName,
        DOB: user.DOB,
        RollNumber: user.RollNumber,
        Branch: user.Branch,
        RoomAlloted: user.RoomAlloted,
        HstelFeePaymentStatus: user.HstelFeePaymentStatus,
        contactNumber:user.contactNumber, 
        EmailAddress:user.EmailAddress ,
        City:user.City ,
        State:user.State ,
        gender:user.gender ,
    }));
res.status(200).json({users:sanitizedUser});
   
} catch (error) {
    console.error (error);
    res.status(500).json({error:'internal server error'});
}
});

module.exports= router;