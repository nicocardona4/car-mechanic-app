const { StatusCodes } = require('http-status-codes');

const ping = async (req, res) => {
    res.status(StatusCodes.OK).send("It works!");
}

module.exports = { ping }