const mongoose = require('mongoose');
const serviceTypeSchema = require('../repositories/serviceType_schema');

const ServiceType = mongoose.model("ServiceType", serviceTypeSchema);

module.exports = ServiceType;