// const bd = require('../models/bd');
const { createError } = require('../utils/errors.js');
const StatusCodes = require('http-status-codes');
const createTodoSchema = require('../validators/create_user_schema');

const createUser = (req, res) => {
    
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

    // if (bd.findUserByEmail(email)) {
    //     res.status(StatusCodes.CONFLICT).json(createError("conflict", `User with email ${email} already exists`));
    //     return;
    // }

    // const newUser = bd.createUser(username, password, email, userType);
    const newUser = { id: 1, username, password, email, userType }; // Mock

    res.status(StatusCodes.CREATED).json(newUser);
}

module.exports = { createUser };