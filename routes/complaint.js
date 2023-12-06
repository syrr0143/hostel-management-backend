const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const Complaint = require('../model/complaint'); // You'll need to have a Complaint model
const router = express.Router();

router.post('/sendComplaint', userMiddleware, async (req, res) => {
    try {
        const { complaintType, description } = req.body;
        // Get user information from middleware
        const user = req.user;
        // Create a new complaint
        const newComplaint = new Complaint({
            studentID: user._id, // Assuming user._id is the student ID
            hostelId: user.hostelId, // Assuming user.hostelID is the hostel ID
            dateSubmitted: new Date(),
            complaintType,
            description,
            studentStatus: 'pending',
            adminStatus: 'pending',
            response: '',
            attachments: [], // Assuming attachments are handled separately
            priority: 'low',
            feedback: '',
        });

        // Save the complaint to the database
        await newComplaint.save();

        return res.status(201).json({ message: 'Complaint submitted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.get('/readComplaints',adminMiddleware,async (req,res)=>{
    try {
        const admin = req.admin;
        // Assuming you want to fetch all complaints for admin review
        const complaints = await Complaint.find({ hostelId: admin.hostelId });

        return res.status(200).json({ complaints });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
})

module.exports = router;
