// const bd = require('../models/bd');
const { changePlanService } = require('../services/users_service');
const { createError } = require('../utils/errors.js');
const bcrypt = require('bcryptjs');
const StatusCodes = require('http-status-codes');
const createTodoSchema = require('../validators/create_user_schema');
const loginSchema = require('../validators/login_schema');
const jwt = require('jsonwebtoken');
const usersService = require('../services/users_service');


const login = async (req, res) => {
    try {
        const { body } = req;

        if (!body) {
            res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
            return;
        }

        const { error } = loginSchema.validate(body);

        if (error) {
            const errorMessage = error.details[0].message;
            res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
            return;
        }


        const token = await usersService.doLogin(body);
        res.status(StatusCodes.OK).json(token);
    } catch (error) {
        console.error("Login error:", error);
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(createError(error.status || "server_error", error.message || "An unexpected error occurred"));
    }

}


const createUser = async (req, res) => {  // CP | meti el async para usar el await
    try {
    const { body } = req;

    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return;
    }

    const { error } = createTodoSchema.validate(body);

    if (error) {
        const errorMessage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
        return;
    }

    const newUser = await usersService.registerUser(body);
    res.status(StatusCodes.CREATED).json(newUser);
} catch (error) {
    console.error("CreateUser error:", error);
    res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(createError(error.status || "server_error", error.message || "An unexpected error occurred"));
    }
}

const changePlan = async (req, res) => {
  try {
    // CP | get del user
    const userId = req.userId;

    const updatedUser = await changePlanService(userId);
    res.status(StatusCodes.OK).json(updatedUser);

  } catch (e) {
    console.error(e);
    res.status(e.code || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createError(e.status || 'server_error', e.message || 'Unexpected error'));
  }
};

module.exports = { createUser, login, changePlan };