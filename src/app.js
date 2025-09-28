require('dotenv').config();

const express = require('express');


const {connectMongoDB} = require('./repositories/mongo_client.js');


connectMongoDB();
const signupRouter = require('./routes/signup_router');
const loginRouter = require('./routes/login_router');
const app = express();
app.use(express.json());
app.use('', signupRouter);
app.use('', loginRouter);

(async () => {
    try {
        await connectMongoDB();
        console.log("conexión mongoDB ok")

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log("App started and listening in port " + port);
        })
    } catch (error) {
        console.log("Error conectando con mongoDB", error);
        process.exit(1);
    }
})();