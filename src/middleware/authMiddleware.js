const jwt = require('jsonwebtoken');
const { createError } = require('../utils/errors');
const StatusCodes = require('http-status-codes');


// CP | Verificar token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1]; // CP | pa separar lo q dijo el profe que venia en 3 lugares distintos
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // CP | aca iria la misma secret q esta en la carpeta .env
    req.user = decoded; // CP | lo almaceno para las rutas 
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(createError('unauthorized', 'Invalid or expired token'));
  }
};


module.exports = { authMiddleware };