const mongoose = require('mongoose')



const userSchema= new mongoose.Schema({
    FullName:{type:String,required:true},
    Password:{type:String , required :true},
    DOB:{type:Date,required:true},
    RollNumber :{type:String,required:true},
    Branch:{type:String ,required:true},
    RoomAlloted:{type:Boolean},
    HstelFeePaymentStatus :{type:Boolean},
    contactNumber:{type:Number,required:true},
    EmailAddress:{
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    City:{type:String, required:true},
    State:{type:String,required:true},
    gender: { type: String, enum: ['male', 'female'], required: true },
    hostelId:{type:String ,required:true}
})


const User = mongoose.model('User', userSchema);

module.exports = User;
