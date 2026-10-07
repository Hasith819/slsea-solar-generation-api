const authentication = {
    '/auth/login': {
        post: {
            tags: ['Authentication'],
            summary: 'Authenticate a user',
            description:
                'Authenticates a user using email and password and returns a JWT access token.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'password'],
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    example: 'director@slsea.lk'
                                },
                                password: {
                                    type: 'string',
                                    format: 'password',
                                    example: 'Password123!'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Login successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    token: {
                                        type: 'string',
                                        description: 'JWT access token'
                                    },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'string',
                                                example: 'user001'
                                            },
                                            email: {
                                                type: 'string',
                                                format: 'email',
                                                example: 'director@slsea.lk'
                                            },
                                            role: {
                                                type: 'string',
                                                enum: [
                                                    'national',
                                                    'province',
                                                    'district'
                                                ],
                                                example: 'national'
                                            },
                                            jurisdictionType: {
                                                type: 'string',
                                                enum: [
                                                    'national',
                                                    'province',
                                                    'district'
                                                ],
                                                example: 'national'
                                            },
                                            jurisdictionId: {
                                                type: 'string',
                                                nullable: true,
                                                example: null
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

                400: {
                    $ref: '#/components/responses/BadRequest'
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                }
            }
        }
    }
};

module.exports = authentication;