// const mongoose = require('mongoose');

// const connectMongoDB = async () => {
//     const connectionURL = process.env.MONGO_DB_HOST;
//     const dbName = process.env.MONGO_TODOS_DB_NAME;
//     console.log(`Nuevo conexión a la base de datos: ${connectionURL}/${dbName}`);

//     await mongoose.connect(`${connectionURL}/${dbName}`, {
//         serverSelectionTimeoutMS: 10000
//     });
// }

// module.exports = connectMongoDB;

// src/repositories/mongo_client.js

//Cabnde
// const mongoose = require('mongoose');
// require('dotenv').config();

// async function connectMongoDB() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connecting MongoDB");
//     } catch (err) {
//         console.error("Error", err);
//     }
//     console.log("Intentando conectar a MongoDB con:", process.env.MONGO_URI);
// }

// module.exports = { connectMongoDB };


const mongoose = require('mongoose');
require('dotenv').config();
async function connectMongoDB() {
    console.log("Conectando a:", process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexión exitosa");
    } catch (err) {
        console.log("Error conectando", err);
    }
}
module.exports =  connectMongoDB ;


