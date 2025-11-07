const Joi = require('joi');

const createServiceSchema = Joi.object({
    customerName: Joi.string().min(2).max(100).required(),
    brand: Joi.string().min(1).max(50).required(),         
    model: Joi.string().min(1).max(100).required(),        
    year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
    licensePlate: Joi.string().min(3).max(20).required(),
    description: Joi.string().max(500).optional(),
    serviceType: Joi.string().valid('maintenance', 'repair', 'inspection').required(),
    cost: Joi.number().min(0).required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
    imageUrl: Joi.string().optional()
});

module.exports = createServiceSchema;
