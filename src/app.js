const express = require('express');
require('dotenv').config();


const publicRouter = require('./routes/public_router');
const app = express();
app.use(express.json());
app.use('/public', publicRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("App started and listening in port " + port);
})