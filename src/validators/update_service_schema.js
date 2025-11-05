const Joi = require('joi');

const updateStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'in-progress', 'completed').required()  
});

module.exports = updateStatusSchema;