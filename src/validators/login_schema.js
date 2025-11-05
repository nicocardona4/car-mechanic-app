const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string().min(2).alphanum().max(53).required(),
    password: Joi.string().min(4).pattern(new RegExp('^[a-zA-Z0-9]{4,}$')).required(),
})

module.exports = loginSchema;