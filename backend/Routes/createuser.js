const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",

  body("emailaddr", "Not a Email").isEmail(),
  body("password", "Invalid password-minimum password length=5").isLength({
    min: 5,
  }),

  async (req, res) => {
    console.log("Received data:", req.body); // Log the incoming data

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailaddr: req.body.emailaddr,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
      });

      console.log("User object to be saved:", newUser); // Log the user object

      await newUser.save(); // Attempt to save the user
      res
        .status(200)
        .json({ success: true, message: "User created successfully!" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.post(
  "/loginuser",
  body("emailaddr", "Invalid email address").isEmail(),
  body("password", "Password must be at least 5 characters long").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { emailaddr, password } = req.body;
    console.log("Received login request for:", emailaddr);

    try {
      const userdata = await User.findOne({ emailaddr });
      console.log("User data retrieved:", userdata);

      if (!userdata) {
        console.log("User not found.");
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      if (password !== userdata.password) {
        console.log("Password does not match.");
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      console.log("Login successful.");
      return res.json({ success: true });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);


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
