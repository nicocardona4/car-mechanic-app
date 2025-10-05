const express = require('express');
const { ping } = require('../controllers/health_controller')

const router = express.Router();

router.get("/ping", ping)
router.get("/", ping)

module.exports = router;