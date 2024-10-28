const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

// Route to get user profile data by email using POST method
router.post('/profile', body('emailaddr').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { emailaddr } = req.body;
      console.log("Received emailaddr:", emailaddr); // Log received email
  
      const user = await User.findOne({ emailaddr });
      console.log("User found:", user); // Log the found user
  
      if (!user) {
        return res.status(404).json({ errors: [{ msg: 'User not found' }] });
      }
  
      return res.json({
        name: user.firstname + ' ' + user.lastname,
        location: user.address,
        email: user.emailaddr
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
