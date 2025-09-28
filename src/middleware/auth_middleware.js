
const { StatusCodes } = require('http-status-codes');
const { createError } = require('../utils/errors');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json(createError("unathorized", "Auth token was not provided"));
        console.log("No hay token");
        return;
    }
    
    try {
        const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = verifiedJWT.userId;
        console.log("devolucion token:", verifiedJWT);
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json(createError("unathorized", "Invalid jwt"));
        return;
    }
}

module.exports = { authMiddleware };