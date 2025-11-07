const { createError } = require('../utils/errors.js');
const StatusCodes = require('http-status-codes');
const createServiceSchema = require('../validators/create_service_schema.js');
const servicesService = require('../services/services_service')
const serviceTypesService = require('../services/serviceTypes_service');
const userService = require('../services/users_service.js');
const updateServiceSchema = require('../validators/update_service_schema');
const User = require('../repositories/user_schema.js');
const filterSchema = require('../validators/filter_services_schema.js');


const createService = async (req, res) => {
    console.log("Create Service Controller Invoked");
    const { body } = req;

    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return;
    }
    if(body.serviceType) {
        const serviceTypes = await serviceTypesService.getServiceTypes();
        const isValidServiceType = serviceTypes.some(st => st.name === body.serviceType);
        if (!isValidServiceType) {
            res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid service type"));
            return;
        }
    }
    const { error } = createServiceSchema.validate(body);

    if (error) {
        console.log(error)
        const errorMessage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
        return;
    }

    const user = await userService.getUserById(req.userId);

    if (user.userType == 'plus' && (await servicesService.countServicesByUserId(req.userId)) >= 10) {
        res.status(StatusCodes.FORBIDDEN).json(createError("forbidden", "User has reached the maximum number of services for free plan"));
        return;
    }

    const { customerName, brand, model, year, licensePlate, description, serviceType, cost , imageUrl} = body;

    try {
        const newService = await servicesService.createService(customerName, brand, model, year, licensePlate, description, serviceType, cost, imageUrl, req.userId);
        res.status(StatusCodes.CREATED).json(newService);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}

const getServices = async (req, res) => {
    const { error } = filterSchema.validate(req.query);
    console.log("error:", error);


    if (error) {
        console.log(error)
        const errorMessage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
        return;
    }
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

    if(body.serviceType) {//Esto queda por si en el futuro se quiere permitir cambiar el tipo de servicio
        const serviceTypes = await serviceTypesService.getServiceTypes();
        const isValidServiceType = serviceTypes.some(st => st.name === body.serviceType);
        if (!isValidServiceType) {
            res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid service type"));
            return;
        }
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

const deleteService = async (req, res) => {
    const serviceId = req.params.id;
    try {
        await servicesService.deleteService(serviceId, req.userId);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        res.status(error.code || 500).json(createError(error.status, error.message));
    }
}



module.exports = {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
};