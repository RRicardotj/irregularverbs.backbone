const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Api server is up' });
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.handleReject(err);
});

module.exports = router;
