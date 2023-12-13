const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const hostel = require('../model/hostel');

router.post('/hostelDetails',adminMiddleware,async (req,res)=>{ 
    const admin = req.admin;
    try {
        const {
            hostelName,
            hostelAddress,
            capacity,
            typeOfHostel,
            facilities,
            rulesAndRegulations,
            wardenOrSupervisor,
            contactInformation,
            roomDetails,
            images,
          } = req.body;
          const hostelDetails = new hostel({
            hostelName,
            hostelAddress,
            capacity,
            typeOfHostel,
            facilities,
            rulesAndRegulations,
            wardenOrSupervisor,
            contactInformation,
            roomDetails,
            images,
          });

          await hostelDetails.save();
          return res.status(201).json({ message: 'Hostel details added successfully' });
         
    } catch (error) {
        console.error(error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.get('/hostelDetails',adminMiddleware,async (req,res)=>{
    try {
        const allHostelDetails = await hostel.find();
        return res.status(200).json({hostelDetails:allHostelDetails});
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
})

module.exports= router;