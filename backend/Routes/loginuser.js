const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

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

module.exports = router;
