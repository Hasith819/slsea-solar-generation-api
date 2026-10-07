function errorHandler(err, req, res, next) {
    console.error(err);

    if (err.code === 11000) {
        return res.status(409).json({
            code: 'DUPLICATE_RESOURCE',
            message: 'Resource already exists',
            detail: 'A resource with the same unique value already exists.'
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            detail: err.message
        });
    }

    return res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
        detail: 'An unexpected error occurred while processing the request.'
    });
}

module.exports = errorHandler;