const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const buildUserDTOResponse = require('../dtos/user_response_dto');
const { StatusCodes } = require('http-status-codes');


const doLogin = async ({ username, password }) => {
    const user = await getUserByUserName(username);

    if (!user) {
        let error = new Error("invalid credentials");
        error.status = "unauthorized";
        error.code = StatusCodes.UNAUTHORIZED;
        throw error;
    }

    const compareResult = await bcrypt.compare(password, user.password);

    if (!compareResult) {
        let error = new Error("invalid credentials");
        error.status = "unauthorized";
        error.code = StatusCodes.UNAUTHORIZED;
        throw error;
    }

    const token = jwt.sign({ username: user.username, userType: user.userType, userId: user._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

    return { token: token , userType: user.userType };
}

const registerUser = async ({ username, password, email, userType }) => {
    if (await getUserByUserName(username)) {
        let error = new Error("user already exists");
        error.status = "conflict";
        error.code = StatusCodes.CONFLICT;
        throw error;
    }
    if (await getUserByEmail(email)) {
        let error = new Error("email already exists");
        error.status = "conflict";
        error.code = StatusCodes.CONFLICT;
        throw error;
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        userType: userType
    });


    try {
        const savedUser = await newUser.save();
        const userDTO = buildUserDTOResponse(savedUser);
        const token = jwt.sign({ username: username, userType: userType, userId: savedUser._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        userDTO.token = token;
        return userDTO;
    } catch (error) {
        let e = new Error("error saving user in database");
        e.status = "internal_error";
        e.code = StatusCodes.INTERNAL_SERVER_ERROR;
        console.log("Error saving user in database", error);
        throw e;
    }
}

const getUserByUserName = async username => await User.findOne({ username: username });
const getUserByEmail = async email => await User.findOne({ email: email });
const getUserById = async id => await User.findById(id);

const changePlanService = async (userId) => {
    const user = await getUserById(userId);

    if (!user) {
        let error = new Error('User not found');
        error.status = 'not_found';
        error.code = StatusCodes.NOT_FOUND;
        throw error;
    }

    if (user.userType !== 'plus') {
        let error = new Error('User must be plus to upgrade');
        error.status = 'forbidden';
        error.code = StatusCodes.FORBIDDEN;
        throw error;
    }

    user.userType = 'premium';
    await user.save();

      const newToken = jwt.sign({username: user.username, userType: user.userType, userId: user._id.toString(),}, process.env.JWT_SECRET_KEY,{ expiresIn: "1h" });

  return { token: newToken, userType: user.userType };
};



module.exports = {
    doLogin,
    registerUser,
    changePlanService,
    getUserById
};