const mongoose = require('mongoose');
const { mongodbUri } = require('./env');

let connectionPromise;

async function connectDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(mongodbUri).then((connection) => {
            console.log('MongoDB connected');
            return connection;
        });
    }

    return connectionPromise;
}

module.exports = { connectDatabase };