const express = require('express');
const { changePlan } = require('../controllers/users_controller');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();


router.patch('/v1/users/change-plan', authMiddleware, changePlan);

module.exports = router;