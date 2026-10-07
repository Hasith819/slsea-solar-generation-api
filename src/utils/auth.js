const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/env');

function createToken(payload) {
    return jwt.sign(payload, jwtSecret, {
        expiresIn: '1h'
    });
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    createToken,
    verifyToken
};