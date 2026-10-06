require('dotenv').config();

const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    port,
    mongodbUri,
    jwtSecret
};