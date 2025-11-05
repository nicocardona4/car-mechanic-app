const buildServiceDTOResponse = service => {
    return {
        customerName: service.customerName,
        brand: service.brand,
        model: service.model,
        year: service.year,
        licensePlate: service.licensePlate,
        description: service.description,
        serviceType: service.serviceType,
        cost: service.cost,
        status: service.status,
    }
}

module.exports = buildServiceDTOResponse