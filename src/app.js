require('dotenv').config();

const express = require('express');


const connectMongoDB = require('./repositories/mongo_client.js');
console.log("¿Qué importé?", connectMongoDB);

const signupRouter = require('./routes/signup_router');
const loginRouter = require('./routes/login_router');
const servicesRouter = require('./routes/services_router');
const serviceTypeRouter = require('./routes/serviceType_router');
const authMiddleware = require('./middleware/auth_middleware.js');
const usersRouter = require('./routes/users_router.js'); 
const healthRouter = require('./routes/health_router');


const app = express();
app.use(express.json());

app.use('', signupRouter);
app.use('', loginRouter);
app.use("/", healthRouter);
app.use(authMiddleware);

app.use('', usersRouter);
app.use('', servicesRouter);
app.use('', serviceTypeRouter);
(async () => {
    try {
        await connectMongoDB();
        const port = process.env.PORT;
        app.listen(port, () => {
            console.log("App started and listening in port " + port);
        })
    } catch (error) {
        process.exit(1);
    }
})();