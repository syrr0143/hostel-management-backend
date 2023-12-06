const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    hostelId: { type:String, ref: 'user', required: true },
    dateSubmitted: { type: Date, default: Date.now },
    complaintType: { type: String, required: true },
    description: { type: String, required: true },
    studentStatus: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
    adminStatus: { type: String, enum: ['pending', 'in-progress', 'resolved'] },
    response: { type: String },
    attachments: [String],
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    feedback: { type: String },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
