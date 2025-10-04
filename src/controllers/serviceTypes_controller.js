const { createError } = require('../utils/errors.js');
const StatusCodes = require('http-status-codes');
const serviceTypesService = require('../services/serviceTypes_service');

const getServiceTypes = async (req, res) => {
    try {
        const serviceTypes = await serviceTypesService.getServiceTypes();
        console.log(serviceTypes);
        res.status(StatusCodes.OK).json(serviceTypes);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}

module.exports = { getServiceTypes };