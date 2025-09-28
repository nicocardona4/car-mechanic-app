const mongoose = require('mongoose');
const serviceSchema = require('../repositories/service_schema');

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;