const mongoose = require('mongoose');
const { mongodbUri } = require('./env');

async function connectDatabase() {
    await mongoose.connect(mongodbUri);
    console.log('MongoDB connected');
}

module.exports = { connectDatabase };