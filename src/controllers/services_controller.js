const { createError } = require('../utils/errors.js');
const StatusCodes = require('http-status-codes');
const createServiceSchema = require('../validators/create_service_schema');
const servicesService = require('../services/services_service');
const updateServiceSchema = require('../validators/update_service_schema');


const createService = async (req, res) => {
    console.log("Create Service Controller Invoked");
    const { body } = req;

    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return;
    }

    const { error } = createServiceSchema.validate(body);

    if (error) {
        console.log(error)
        const errorMessage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
        return;
    }

    const { customerName, brand, model, year, licensePlate, description, serviceType, cost } = body;

    try {
        const newService = await servicesService.createService(customerName, brand, model, year, licensePlate, description, serviceType, cost, req.userId);
        res.status(StatusCodes.CREATED).json(newService);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}

const getServices = async (req, res) => {
    try {
        let services = await servicesService.getServicesByUserId(req.userId, req.query);
        res.status(StatusCodes.OK).json(services);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}

const getServiceById = async (req, res) => {
    const serviceId = req.params.id;
    console.log(serviceId);

    try {
        const service = await servicesService.findServiceById(serviceId, req.userId);
        res.status(StatusCodes.OK).json(service);
    }
    catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}

const updateService = async (req, res) => {
    const serviceId = req.params.id;
    const { body } = req;

    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return;
    }

    const { error } = updateServiceSchema.validate(body);

    if (error) {
        console.log(error)
        const errorMessage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
        return;
    }
    const { status } = req.body;

    try {
        const updatedService = await servicesService.updateService(serviceId, status, req.userId);
        res.status(StatusCodes.OK).json(updatedService);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}


module.exports = {
    createService,
    getServices,
    getServiceById,
    updateService
};