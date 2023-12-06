const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    dateIssued: { type: Date, default: Date.now },
    author: { type: String, required: true },
    hostelId: { type:String, ref: 'admin', required: true },
    targetAudience: { type: String },  // You can customize this field based on your needs
    attachments: [String],  // Assuming file paths or URLs are stored as strings
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
