const express = require('express')
const router = express.Router();    
const stripe = require('stripe');
router.post('/process-payment', async (req, res) => {
    try {
      // Extract payment data from the request body
      const { amount, token } = req.body;
  
      // Create a charge using the Stripe API
      const charge = await stripe.charges.create({
        amount: amount, // Amount in cents
        currency: inr,
        source: token, // Token obtained from the client-side using Stripe.js
        description: 'Payment for your product or service',
      });
  
      // Log the charge object (you might want to store this in your database)
      console.log('Stripe Charge:', charge);
  
      // Respond to the client based on the charge result
      res.json({ status: 'success', message: 'Payment successful', chargeId: charge.id });
    } catch (error) {
      console.error('Stripe payment processing error:', error.message);
      res.status(500).json({ status: 'error', message: 'Payment processing error' });
    }
  });
  
  module.exports=router ;