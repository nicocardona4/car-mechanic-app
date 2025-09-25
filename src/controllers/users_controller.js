// const bd = require('../models/bd');
const { createError } = require('../utils/errors.js');
const bcrypt = require('bcrypt');
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

    const { username, password, email, userType } = body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = await usersService.signup({ username, password: hashedPassword, email, userType });
        res.status(StatusCodes.CREATED).json(newUser);
    } catch(error){
         req.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createError("server_error", error.message));
    }



    // const newUser = bd.createUser(username, password, email, userType);
    //const newUser = { id: 1, username, password, email, userType }; // Mock

   // res.status(StatusCodes.CREATED).json(newUser);

    // const newUser = bd.createUser(username, password, email, userType);
    const newUser = { id: 1, username, password, email, userType }; // Mock

    res.status(StatusCodes.CREATED).json(newUser);
} catch (error) {
    console.error("CreateUser error:", error);
    res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(createError(error.status || "server_error", error.message || "An unexpected error occurred"));
    }
}

module.exports = { createUser, login };