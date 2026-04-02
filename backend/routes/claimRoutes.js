const express = require('express');
const router = express.Router();

// Claim payout
router.post('/claim', (req, res) => {
  const { type, amount } = req.body;

  res.json({
    message: "Claim processed",
    type,
    amount
  });
});

module.exports = router;
