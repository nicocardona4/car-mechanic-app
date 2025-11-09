const Joi = require('joi');

const schema = Joi.object({
  startDate: Joi.date(),
  endDate: Joi.date(),
  status: Joi.string().valid('pending', 'in-progress', 'completed'),
  serviceType: Joi.string().min(3).max(50)
});

module.exports = schema;