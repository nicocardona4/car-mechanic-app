const express = require('express');
const { createUser } = require('../controllers/users_controller');

const router = express.Router();


router.post("/v1/signup", createUser);

router.get('/profile', (req, res) => {
  res.json({ message: 'Testing', user: req.user });
});

module.exports = router;