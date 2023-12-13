const mongoose = require('mongoose');

const hostelDetailsSchema = new mongoose.Schema({
  hostelName: { type: String, required: true },
  hostelAddress: { type: String, required: true },
  capacity: { type: Number, required: true },
  typeOfHostel: { type: String, enum: ['Boys', 'Girls', 'Co-ed'], required: true },
  facilities: [{ type: String }],
  rulesAndRegulations: { type: String },
  warden: { type: String},
  contactInformation: {
    phoneNumber: { type: String },
    emailAddress: { type: String },
  },
  roomDetails: [{
    roomNumber: { type: String },
    capacity: { type: Number },
    availability: { type: Boolean, default: true },
  }],
  images: [{ type: String }],
  updatedAt: { type: Date, default: Date.now },
});

const HostelDetails = mongoose.model('HostelDetails', hostelDetailsSchema);

module.exports = HostelDetails;
