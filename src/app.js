require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectMongoDB = require('./repositories/mongo_client.js');
console.log("¿Qué importé?", connectMongoDB);

const signupRouter = require('./routes/signup_router.js');
const loginRouter = require('./routes/login_router.js');
const servicesRouter = require('./routes/services_router.js');
const serviceTypeRouter = require('./routes/serviceType_router');
const authMiddleware = require('./middleware/auth_middleware.js');
const usersRouter = require('./routes/users_router'); 
const healthRouter = require('./routes/health_router');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5178',           // CP | Nico este es mi entorno local, estoy testeando si queres cambia al tuyo desp
    'https://car-mechanic-ten.vercel.app'  
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

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
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log("App started and listening in port " + port);
        })
    } catch (error) {
        process.exit(1);
    }
})();