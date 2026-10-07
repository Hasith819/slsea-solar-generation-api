function authorize(...allowedTypes) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                code: 'AUTHENTICATION_REQUIRED',
                message: 'Authentication required',
                detail: 'A valid authenticated user is required.'
            });
        }

        if (!allowedTypes.includes(req.user.jurisdictionType)) {
            return res.status(403).json({
                code: 'ACCESS_DENIED',
                message: 'Access denied',
                detail: 'You are not authorized to access this resource.'
            });
        }

        next();
    };
}

module.exports = {
    authorize
};