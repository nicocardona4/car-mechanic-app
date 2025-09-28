require('dotenv').config();

const express = require('express');


const connectMongoDB = require('./repositories/mongo_client.js');
console.log("¿Qué importé?", connectMongoDB);


const authMiddleware = require('./middleware/auth_middleware.js');

const signupRouter = require('./routes/signup_router');
const loginRouter = require('./routes/login_router');
const servicesRouter = require('./routes/services_router');

const app = express();
app.use(express.json());

app.use('', signupRouter);
app.use('', loginRouter);
app.use(authMiddleware);

app.use('', servicesRouter);
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