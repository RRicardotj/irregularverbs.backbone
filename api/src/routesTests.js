const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Api server test is up' });
});

router.use('/user', require('./users/infraestructure/UserExpressFakeRouter'));

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.handleReject(err);
});

module.exports = router;
