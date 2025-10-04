const { StatusCodes } = require('http-status-codes');
const Service = require('../models/service_model');
const buildServiceDTOResponse = require('../dtos/service_response_dto');


const createService = async (customerName, brand, model, year, licensePlate, description, serviceType, cost, userId) => {
    console.log("Creating service with data:", { customerName, brand, model, year, licensePlate, description, serviceType, cost, userId });
    const newService = new Service({
        customerName,
        brand,
        model,
        year,
        licensePlate,
        description,
        serviceType,
        cost,
        userId
    });
    console.log(newService);

    try {
        const savedService = await newService.save();
        return buildServiceDTOResponse(savedService);
    } catch (e) {
        console.log("error saving service in database", e);
        let error = new Error("error saving service in database");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const getServicesByUserId = async (userId, queryParams) => {
    try {

        let query = { userId: userId };

        if (queryParams.status) {
            query.status = queryParams.status;
        }

        if (queryParams.serviceType) {
            query.serviceType = queryParams.serviceType;
        }

        const services = await Service.find(query);
        let servicesResponse = services.map(service => {
            return buildServiceDTOResponse(service);
        });
        return servicesResponse;
    } catch (e) {
        console.log("error getting services for user", e);
        let error = new Error("error getting services for user");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const findServiceById = async (serviceId, userId) => {
    try {
        const service = await findServiceByIdInDB(serviceId, userId);
        return buildServiceDTOResponse(service);
    } catch (error) {
        throw error
    }
}

const findServiceByIdInDB = async (serviceId, userId) => {
    let service;
    try {
        service = await Service.findById(serviceId);
    } catch (e) {
        console.log("error getting service in database", e)
        let error = new Error("error getting service in database");
        error.status = "internal_server_error",
            error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error
    }

    if (!service) {
        let error = new Error("service was not found in database");
        error.status = "not_found",
            error.code = StatusCodes.NOT_FOUND;
        throw error
    }

    if (service.userId.toString() !== userId) {
        let error = new Error("not allowed to access this resource");
        error.status = "forbidden",
            error.code = StatusCodes.FORBIDDEN;
        throw error
    }
    return service;
} 

const countServicesByUserId = async (userId) => {
    try {
        const count = await Service.countDocuments({ userId: userId });
        console.log("Count of services for user:", count);
        return count;
    } catch (e) {
        console.log("error counting services for user", e);
        let error = new Error("error counting services for user");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const updateService = async (serviceId, status, userId) => {
    try {
        const service = await findServiceByIdInDB(serviceId, userId);

        Object.assign(service, { status: status });
        const updatedService = await service.save()
        return buildServiceDTOResponse(updatedService);
    } catch (error) {
        throw error;
    }
}

const deleteService = async (serviceId, userId) => {
    try {
        const service = await findServiceByIdInDB(serviceId, userId);
        await service.deleteOne();
    } catch (error) {
        throw error;
    }
}

module.exports = { countServicesByUserId,createService ,getServicesByUserId,findServiceById,updateService,deleteService};