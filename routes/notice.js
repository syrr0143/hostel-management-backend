const express = require('express');
const notice = require('../model/notice');
const userMiddleware = require('../middleware/userMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const router = express.Router();

router.post('/postNotice',adminMiddleware,async (req,res)=>{
    try {
        const {title,content,targetAudience,attachments}= req.body;
        const admin = req.admin;

        const newNotice = new notice({
            title,content,dateIssued:new Date(),author:admin.name,targetAudience,attachments,hostelId: admin.hostelId

        })

        await newNotice.save();
        return res.status(201).json({message:'Notice submiited successfully'});
        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'internal server error ', details: error.message });

    }
});


router.get('/readNotices',userMiddleware,async (req,res)=>{
    try {
        const user = req.user;
        // Assuming you want to fetch all complaints for admin review
        const notices = await notice.find({ hostelId: user.hostelId });

        return res.status(200).json({ notices });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
})

module.exports= router;