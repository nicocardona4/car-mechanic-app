const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    customerName: { 
        type: String, 
        required: true, 
        minlength: 2, 
        maxlength: 100 
    },
    brand: { 
        type: String, 
        required: true, 
        minlength: 1, 
        maxlength: 50 
    },
    model: { 
        type: String, 
        required: true, 
        minlength: 1, 
        maxlength: 100 
    },
    year: { 
        type: Number, 
        required: true, 
        min: 1900, 
        max: new Date().getFullYear() 
    },
    licensePlate: { 
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 20 
    },
    description: { 
        type: String, 
        maxlength: 500 
    },
    serviceType: { 
        type: String, 
        required: true, 
        enum: ['maintenance', 'repair', 'inspection'] 
    },
    cost: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    status: { 
        type: String, 
        enum: ['pending', 'in-progress', 'completed'], 
        default: 'pending' 
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }
}, {
    collection: "services",
    timestamps: true
});

module.exports = serviceSchema;
