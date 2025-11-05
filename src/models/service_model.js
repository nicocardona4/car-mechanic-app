const mongoose = require('mongoose');
const serviceSchema = require('../repositories/service_schema.js');

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;