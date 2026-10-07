const { verifyToken } = require('../utils/auth');

function authenticate(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            code: 'AUTHENTICATION_REQUIRED',
            message: 'Authentication required',
            detail: 'A Bearer token is required to access this resource.'
        });
    }

    const parts = authorization.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            code: 'INVALID_AUTHORIZATION',
            message: 'Invalid authorization header',
            detail: 'Authorization must use the Bearer token format.'
        });
    }

    const token = parts[1];

    try {
        const payload = verifyToken(token);

        req.user = payload;

        next();
    } catch (error) {
        return res.status(401).json({
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired token',
            detail: 'The provided authentication token is invalid or has expired.'
        });
    }
}

module.exports = {
    authenticate
};