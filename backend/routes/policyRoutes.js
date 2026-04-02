const express = require('express');
const router = express.Router();

// Activate Policy
router.post('/activate', (req, res) => {
  res.json({
    message: "Policy activated successfully"
  });
});

module.exports = router;
