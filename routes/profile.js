const express =require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const userMiddleware = require('../middleware/userMiddleware');
const admin = require('../model/admin')
const user  = require('../model/user')


router.get('/admin/profile', adminMiddleware, async (req, res) => {
    try {
        const loggedAdmin = req.admin;

        // Use findOne instead of find to get a single document
        const foundAdmin = await admin.findOne({ emailAddress: loggedAdmin.emailAddress });

        if (!foundAdmin) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        // Remove sensitive information from the found admin before sending it in the response
        const sanitizedAdmin = {
            name: foundAdmin.name,
            emailAddress: foundAdmin.emailAddress,
            contactInformation:foundAdmin.contactInformation,
            gender:foundAdmin.gender,
            address:foundAdmin.address,
            hostelId:foundAdmin.hostelId
        };

        return res.status(200).json({ admin: sanitizedAdmin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.get('/user/profile', userMiddleware, async (req, res) => {
    try {
        const loggedUser = req.user;

        // Use findOne instead of find to get a single document
        const foundUser = await user.findOne({ RollNumber: loggedUser.RollNumber });

        if (!foundUser) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        // Remove sensitive information from the found admin before sending it in the response
        const sanitizedUser = {
            name: foundUser.FullName,
            emailAddress: foundUser.EmailAddress,
            contactInformation:foundUser.contactNumber,
            gender:foundUser.gender,
            hostelId:foundUser.hostelId,
            DOB:foundUser.DOB,
            RollNumber:foundUser.RollNumber,
            branch :foundUser.Branch,
            city :foundUser.City,
            state:foundUser.State,
            RoomAlloted:foundUser.RoomAlloted,
            HostelFeePaymentStatus:foundUser.HstelFeePaymentStatus,
        };

        return res.status(200).json({ admin: sanitizedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;