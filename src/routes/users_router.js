const express = require('express');
const   {changePlan}  = require('../controllers/users_controller');
const { authMiddleware } = require('../middleware/auth_middleware');
const router = express.Router();


router.put('/v1/users/change-plan', changePlan);

module.exports = router;