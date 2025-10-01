const express = require('express');
const  { getServiceTypes }  = require('../controllers/serviceTypes_controller');

const router = express.Router();

router.get("/v1/service-types", getServiceTypes);


module.exports = router;