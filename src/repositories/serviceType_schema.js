const mongoose = require('mongoose');
const ServiceType = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
})

module.exports = ServiceType;