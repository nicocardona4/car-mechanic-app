const express = require('express');

const {login} = require('../controllers/users_controller');

const router = express.Router();

router.post("/v1/login", login)

module.exports = router;