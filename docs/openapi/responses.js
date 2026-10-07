const responses = {
    Unauthorized: {
        description: 'Authentication is required or the access token is invalid.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                }
            }
        }
    },

    Forbidden: {
        description: 'The authenticated user is not authorized to access this resource.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                }
            }
        }
    },

    NotFound: {
        description: 'The requested resource was not found.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                }
            }
        }
    },

    BadRequest: {
        description: 'The request contains invalid or missing data.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                }
            }
        }
    },

    Conflict: {
        description: 'The request conflicts with the current state of the resource.',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ErrorResponse'
                }
            }
        }
    },

    NotModified: {
        description:
            'The requested resource has not changed since the client last retrieved it.',
        headers: {
            ETag: {
                description:
                    'Entity tag identifying the current representation of the resource.',
                schema: {
                    type: 'string',
                    example:
                        '"9b1f4a6c5d7e8f901234567890abcdef1234567890abcdef1234567890abcdef"'
                }
            },
            'Last-Modified': {
                description:
                    'Date and time when the resource was last modified.',
                schema: {
                    type: 'string',
                    format: 'date-time',
                    example: 'Wed, 07 Oct 2026 10:30:00 GMT'
                }
            }
        }
    }

};

module.exports = responses;