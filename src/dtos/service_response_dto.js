const buildServiceDTOResponse = service => {
    return {
        id: service._id,
        customerName: service.customerName,
        brand: service.brand,
        model: service.model,
        year: service.year,
        licensePlate: service.licensePlate,
        description: service.description,
        serviceType: service.serviceType,
        cost: service.cost,
        status: service.status,
        imageUrl: service.imageUrl,
    }
}

module.exports = buildServiceDTOResponse