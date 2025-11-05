const { StatusCodes } = require('http-status-codes');
const buildServiceTypesDTOResponse = require('../dtos/serviceType_response_dto');
const ServiceType = require('../models/serviceType_model');



const getServiceTypes = async () => {
    try {
        const serviceTypes = await ServiceType.find()
        let servicesResponse = serviceTypes.map(serviceType => {
            return buildServiceTypesDTOResponse(serviceType);
        });
        return servicesResponse;
    } catch (e) {
        console.log("error getting service types", e);
        let error = new Error("error getting service types");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

module.exports = { getServiceTypes };