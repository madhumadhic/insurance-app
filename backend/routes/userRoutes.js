const express = require('express');
const router = express.Router();

// Register User
router.post('/register', (req, res) => {
  const user = req.body;
  console.log("User Registered:", user);

  res.json({
    message: "User registered successfully",
    user
  });
});

module.exports = router;
