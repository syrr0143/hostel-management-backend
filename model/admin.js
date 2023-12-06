const mongoose = require('mongoose');
const validator = require('validator')
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInformation: { type: Number, required: true },
    password:{type:String , required:true},
    emailAddress: { type: String, required: true, validate: validator.isEmail },
    address:{type:String, required:true},
    gender: { type: String, enum: ['male', 'female'], required: true },
    hostelId:{type:String,required:true}
    
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
