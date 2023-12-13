// routes/userRoutes.js
const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const User = require('../model/user');

const router = express.Router();

// Search users
router.get('/search-users', adminMiddleware, async (req, res) => {
  try {
    const { name, rollNo,email,_id } = req.query;

    // Define an empty filter object
    const filter = {};

    // Add conditions to the filter based on the provided parameters
    if (name) {
      filter.FullName = { $regex: new RegExp(`^${name}$`, 'i') };
    }
    if (email) {
      filter.EmailAddress = { $regex: new RegExp(`^${email}$`, 'i') };
    }
    if (_id) {
        filter._id = _id; // No need for $regex when searching by _id
      }

    if (rollNo) {
      filter.RollNumber = { $regex: new RegExp(`^${rollNo}$`, 'i') };
    }

    // Use the filter object to perform the search
    const searchResult = await User.find(filter);

    // Exclude sensitive information like passwords before sending the response
    const sanitizedResult = searchResult.map(user => ({
        FullName: user.FullName,
        RollNumber: user.RollNumber,
      DOB: user.DOB,
      Branch: user.Branch,
      RoomAlloted: user.RoomAlloted,
      HstelFeePaymentStatus: user.HstelFeePaymentStatus,
      contactNumber: user.contactNumber,
      EmailAddress: user.EmailAddress,
      City: user.City,
      State: user.State,
      gender: user.gender,
      hostelId: user.hostelId,
    }));

    res.status(200).json({ searchResult: sanitizedResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
