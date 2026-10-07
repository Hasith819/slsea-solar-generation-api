const districts = {
    '/districts': {
        get: {
            tags: ['Districts'],
            summary: 'Get all districts',
            description: 'Returns all districts available in the SLSEA system.',
            security: [
                {
                    bearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: 'List of districts',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/District'
                                }
                            }
                        }
                    }
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                }
            }
        }
    },

    '/districts/{districtId}': {
        get: {
            tags: ['Districts'],
            summary: 'Get a district by ID',
            description: 'Returns a single district using its ID.',
            security: [
                {
                    bearerAuth: []
                }
            ],
            parameters: [
                {
                    name: 'districtId',
                    in: 'path',
                    required: true,
                    description: 'Unique identifier of the district.',
                    schema: {
                        type: 'string'
                    },
                    example: 'b2c3d4e5f601234567890123'
                }
            ],
            responses: {
                200: {
                    description: 'District found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/District'
                            }
                        }
                    }
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                },

                404: {
                    $ref: '#/components/responses/NotFound'
                }
            }
        }
    },

    '/districts/{districtId}/substations': {
        get: {
            tags: ['Districts'],
            summary: 'Get substations in a district',
            description:
                'Returns all grid substations belonging to the specified district.',
            security: [
                {
                    bearerAuth: []
                }
            ],
            parameters: [
                {
                    name: 'districtId',
                    in: 'path',
                    required: true,
                    description: 'Unique identifier of the district.',
                    schema: {
                        type: 'string'
                    },
                    example: 'b2c3d4e5f601234567890123'
                }
            ],
            responses: {
                200: {
                    description: 'List of substations in the district',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/GridSubstation'
                                }
                            }
                        }
                    }
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                },

                404: {
                    $ref: '#/components/responses/NotFound'
                }
            }
        }
    }
};

module.exports = districts;