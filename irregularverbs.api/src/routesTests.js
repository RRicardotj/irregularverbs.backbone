const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Api server test is up' });
});

router.use('/user', require('./users/infraestructure/UserExpressFakeRouter'));

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.handleReject(err);
});

module.exports = router;
